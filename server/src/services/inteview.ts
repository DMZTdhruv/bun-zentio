import type { InferSelectModel } from "drizzle-orm";
import { UserRepo } from "../repository/auth";
import { InterviewRepo } from "../repository/interview";
import { ZentioError } from "../utils/utils";
import type { JobPost } from "../db/schema";
import type { JobPostCreation } from "../schema/interview";

type Model = InferSelectModel<typeof JobPost>;

export const createJobPostService = async (
   data: JobPostCreation,
   username: string,
): Promise<Model> => {
   const userExists = await UserRepo.getUserByUsername(username);
   if (!userExists) {
      throw new ZentioError(`no account registered with this email`, 404);
   }
   const res = await InterviewRepo.createAiMockInterviewJobPost(username, data);
   if (!res) {
      throw new ZentioError(`failed to create interview`, 400);
   }

   return res;
};
