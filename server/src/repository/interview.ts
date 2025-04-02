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
import type {
   JobInterviewRootSchema,
   ProblemDetails,
   topPart,
} from "../schema/question";
import type { z } from "zod";

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

   export const getInterviewByJobPostId = async (
      jobPostId: string,
   ): Promise<JobInterviewRootSchema | undefined> => {
      const jobInterviewData = await db
         .select()
         .from(JobPost)
         .where(eq(JobPost.id, jobPostId))
         .innerJoin(JobInterview, eq(JobInterview.job_post_id, JobPost.id))
         .innerJoin(Problem, eq(Problem.job_interview_id, JobInterview.id))
         .innerJoin(headerSection, eq(headerSection.problem_id, Problem.id))
         .innerJoin(examplesSection, eq(examplesSection.problem_id, Problem.id))
         .innerJoin(
            constraintsSection,
            eq(constraintsSection.problem_id, Problem.id),
         )
         .innerJoin(
            additionalInfoSection,
            eq(additionalInfoSection.problem_id, Problem.id),
         );

      // Check if any data was found
      if (jobInterviewData.length === 0) {
         return undefined;
      }

      // Create the jobDetails array with the correct types
      // fine asf
      const jobDetails = [
         {
            type: "jobPost" as const,
            jobDetails: { ...jobInterviewData[0].job_posts },
         },
         {
            type: "jobInterview" as const,
            jobInterviewDetails: { ...jobInterviewData[0].job_interview },
         },
      ] as z.infer<typeof topPart>;

      console.log(JSON.stringify(jobDetails, null, 2));
      const problemsData = {
         type: "problems" as const,
         problemDetails: [] as ProblemDetails[],
      };

      for (const data of jobInterviewData) {
         const exampleDataPromise = db
            .select()
            .from(example)
            .where(eq(example.example_section_id, data.examples_section.id));
         const constraintDataPromise = db
            .select()
            .from(constraint)
            .where(
               eq(
                  constraint.constraint_section_id,
                  data.constraints_section.id,
               ),
            );
         const [exampleData, constraintData] = await Promise.all([
            exampleDataPromise,
            constraintDataPromise,
         ]);

         const problemData: ProblemDetails = {
            ...data.problem,
            sections: {
               headerSection: data.header_section,
               examplesSection: {
                  ...data.examples_section,
                  type: "examples" as const,
                  examples: exampleData,
               },
               constraintsSection: {
                  ...data.constraints_section,
                  type: "constraints" as const,
                  constraints: constraintData,
               },
               additionalInfoSection: {
                  ...data.additional_info_section,
                  type: "additional_information" as const,
               },
            },
         };

         problemsData.problemDetails.push(problemData);
      }

      const returnData: JobInterviewRootSchema = [...jobDetails, problemsData];

      return returnData;
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
