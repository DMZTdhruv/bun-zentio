import { and, eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../db";
import { jobPostingSchema, type JobPostCreation } from "../schema/job";
import { Gemini } from "./gemini";
import { locations, techCompanies, ZentioError } from "../utils/utils";
import type { GenerateLeetCodeQuestionsWithGeminiSchema } from "../schema/ai";
import { JobPost } from "../db/schema/job.sql";
import {
   additionalInfoSection,
   constraint,
   constraintsSection,
   example,
   examplesSection,
   headerSection,
   JobInterview,
   Problem,
} from "../db/schema/question.sql";

export namespace InterviewRepo {
   export type Model = InferSelectModel<typeof JobPost>;
   export type JobInterviewModel = InferSelectModel<typeof JobInterview>;

   export async function createAiMockInterviewJobPost(
      userId: string,
      data: JobPostCreation,
   ): Promise<Model | undefined> {
      const title = data.title?.trim().length
         ? data.title
         : `${data.job_type.slice(0, 1).toUpperCase()}${data.job_type.slice(1)} developer`;

      const company =
         data.company ??
         techCompanies[Math.floor(Math.random() * techCompanies.length)];

      const location =
         data.location ??
         locations[Math.floor(Math.random() * techCompanies.length)];

      const promptData = JSON.stringify({
         ...data,
         company,
         location,
         title,
      });

      // gemini generate questions
      const res = await Gemini.generateJobPostDetails(promptData);
      const aiResponse = jobPostingSchema.parse(res);

      // creating questions
      const job_post = (
         await db
            .insert(JobPost)
            .values({
               ...data,
               location,
               company,
               title,
               created_by: userId,
               job_posting: aiResponse,
            })
            .returning()
      )[0];

      // generate questions for job
      await generateQuestionForJobPost(userId, job_post.id, {
         position: job_post.position,
         job_type: job_post.job_type,
      });

      return job_post;
   }

   export const getUserJobPosts = async (
      userId: string,
   ): Promise<Model[] | undefined> => {
      return db.select().from(JobPost).where(eq(JobPost.created_by, userId));
   };

   export const getUserJobPostById = async (
      userId: string,
      id: string,
   ): Promise<Model | undefined> => {
      return (
         await db
            .select()
            .from(JobPost)
            .where(and(eq(JobPost.created_by, userId), eq(JobPost.id, id)))
      )[0];
   };

   export const getJobPostById = async (
      userId: string,
      id: string,
   ): Promise<Model | undefined> => {
      const record = (
         await db.select().from(JobPost).where(eq(JobPost.id, id))
      )[0];
      if (!record) {
         throw new ZentioError("record not found with the id" + id, 400);
      }
      if (record.public) {
         return record;
      }
      if (record.created_by === userId) return record;
      return undefined;
   };

   export const deleteJobPost = async (
      userId: string,
      id: string,
   ): Promise<Model | undefined> => {
      return (
         await db
            .delete(JobPost)
            .where(and(eq(JobPost.id, id), eq(JobPost.created_by, userId)))
            .returning()
      )[0];
   };

   export const getInterviewByJobPostId = async (jobPostId: string) => {
      return (
         await db
            .select({
               interview: JobInterview,
               job_post: {
                  id: JobPost.id,
                  title: JobPost.title,
                  job_type: JobPost.job_type,
               },
            })
            .from(JobInterview)
            .where(eq(JobInterview.job_post_id, jobPostId))
            .innerJoin(JobPost, eq(JobInterview.job_post_id, JobPost.id))
      )[0];
   };

   export const generateQuestionForJobPost = async (
      userId: string,
      postId: string,
      { position, job_type }: GenerateLeetCodeQuestionsWithGeminiSchema,
   ) => {
      // create the job interview
      const jobInterview = (
         await db
            .insert(JobInterview)
            .values({
               created_by: userId,
               job_post_id: postId,
            })
            .returning()
      )[0];

      // make ai make question hell yeah
      const questions = await Gemini.generateLeetCodeQuestions({
         job_type,
         position,
      });

      // check if the questions exists very important
      if (!questions || !questions.length) {
         throw new ZentioError("failed to generate the questions", 404);
      }

      // we do loop
      for (const question of questions) {
         const questionHeaderSection = question.sections.find(
            (section) => section.type === "header",
         );
         const questionExampleSection = question.sections.find(
            (section) => section.type === "examples",
         );
         const questionConstraintSection = question.sections.find(
            (section) => section.type === "constraints",
         );
         const questionAdditionalInformationSection = question.sections.find(
            (section) => section.type === "additional_information",
         );

         if (
            !questionHeaderSection ||
            !questionExampleSection ||
            !questionConstraintSection ||
            !questionAdditionalInformationSection
         ) {
            return;
         }

         // make the problem first
         const problem = (
            await db
               .insert(Problem)
               .values({
                  job_interview_id: jobInterview.id,
               })
               .returning()
         )[0];

         // then header
         const headerPromise = db
            .insert(headerSection)
            .values({
               problem_id: problem.id,
               title: questionHeaderSection.title,
               description: questionHeaderSection.description,
            })
            .returning();

         // then example section
         const exampleSection = (
            await db
               .insert(examplesSection)
               .values({
                  problem_id: problem.id,
               })
               .returning()
         )[0];

         // then example section data
         const examples = questionExampleSection.examples.map((value) => {
            return db.insert(example).values({
               example_section_id: exampleSection.id,
               inputs: value.inputs,
               output: value.output,
               number: value.number,
            });
         });

         // then make the constraint section
         const constraintSection = (
            await db
               .insert(constraintsSection)
               .values({
                  problem_id: problem.id,
               })
               .returning()
         )[0];
         // then insert the constraints data
         const constraints = questionConstraintSection.constraints.map(
            (value) => {
               return db.insert(constraint).values({
                  constraint_section_id: constraintSection.id,
                  content: value,
               });
            },
         );

         const additionalInformationPromise = db
            .insert(additionalInfoSection)
            .values({
               problem_id: problem.id,
               description: questionAdditionalInformationSection.description,
            })
            .returning();

         await Promise.all([
            headerPromise,
            additionalInformationPromise,
            ...constraints,
            ...examples,
         ]);
      }
   };
}
