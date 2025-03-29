import { and, eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../db";
import { JobInterview, JobPost } from "../db/schema";
import {
   jobPostingSchema,
   type JobInterviewQuestionsCreation,
   type JobPostCreation,
} from "../schema/interview";
import { AiRepo } from "./ai";
import { locations, techCompanies, ZentioError } from "../utils/utils";
import type { GenerateLeetCodeQuestionsWithGeminiSchema } from "../schema/ai";

export namespace InterviewRepo {
   export type Model = InferSelectModel<typeof JobPost>;
   export type JobInterviewModel = InferSelectModel<typeof JobInterview>;

   export async function createAiMockInterviewJobPost(
      username: string,
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

      console.log({
         ...data,
      });

      const res = await AiRepo.generateWithGemini(promptData);
      const aiResponse = jobPostingSchema.parse(res);

      return (
         await db
            .insert(JobPost)
            .values({
               ...data,
               location,
               company,
               title,
               created_by: username,
               job_posting: aiResponse,
            })
            .returning()
      )[0];
   }

   export const getUserJobPosts = async (
      username: string,
   ): Promise<Model[] | undefined> => {
      return db.select().from(JobPost).where(eq(JobPost.created_by, username));
   };

   export const getUserJobPostById = async (
      username: string,
      id: string,
   ): Promise<Model | undefined> => {
      return (
         await db
            .select()
            .from(JobPost)
            .where(and(eq(JobPost.created_by, username), eq(JobPost.id, id)))
      )[0];
   };

   export const getJobPostById = async (
      username: string,
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
      if (record.created_by === username) return record;
      return undefined;
   };

   export const deleteJobPost = async (
      username: string,
      id: string,
   ): Promise<Model | undefined> => {
      return (
         await db
            .delete(JobPost)
            .where(and(eq(JobPost.id, id), eq(JobPost.created_by, username)))
            .returning()
      )[0];
   };

   export const generateQuestionForJobPost = async (
      username: string,
      postId: string,
      { position, job_type }: GenerateLeetCodeQuestionsWithGeminiSchema,
   ): Promise<JobInterviewModel | undefined> => {
      const questions = await AiRepo.generateLeetCodeQuestionsWithGemini({
         job_type,
         position,
      });

      if (!questions || !questions.length) {
         throw new ZentioError("failed to generate the questions", 404);
      }

      return (
         await db
            .insert(JobInterview)
            .values({
               questions: questions,
               created_by: username,
               job_post_id: postId,
            })
            .returning()
      )[0];
   };
}
