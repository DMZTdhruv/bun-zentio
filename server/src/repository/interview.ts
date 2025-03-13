import type { InferSelectModel } from "drizzle-orm";
import { db } from "../db";
import { JobPost } from "../db/schema";
import type { JobPostCreation } from "../schema/interview";
import { AiRepo } from "./ai";
import { locations, techCompanies } from "../utils/utils";

export namespace InterviewRepo {
   export type Model = InferSelectModel<typeof JobPost>;

   export async function createAiMockInterviewJobPost(
      username: string,
      data: JobPostCreation,
   ): Promise<Model | undefined> {
      // crating a string of prompt

      // random data
      const title = data.title ?? `${data.job_type} developer`;
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

      // generating the job posting with the help of prompt
      const res = await AiRepo.generateWithGemini(promptData);
      console.log(res);

      return (
         await db
            .insert(JobPost)
            .values({
               ...data,
               company,
               location,
               title,
               job_posting: res,
               created_by: username,
            })
            .returning()
      )[0];
   }
}
