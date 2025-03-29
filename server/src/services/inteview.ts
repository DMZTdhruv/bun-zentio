import type { InferSelectModel } from "drizzle-orm";
import { UserRepo } from "../repository/auth";
import { InterviewRepo } from "../repository/interview";
import { ZentioError } from "../utils/utils";
import type { JobPost } from "../db/schema";
import type {
   JobInterviewQuestionsCreation,
   JobPostCreation,
} from "../schema/interview";

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
      throw new ZentioError(`failed to create job post`, 400);
   }

   return res;
};

export const getUserJobPostService = async (
   username: string,
): Promise<Model[]> => {
   const userExists = await UserRepo.getUserByUsername(username);
   if (!userExists) {
      throw new ZentioError(`no account registered with this email`, 404);
   }
   const res = await InterviewRepo.getUserJobPosts(username);
   if (!res) {
      throw new ZentioError(`failed to fetch job posts`, 400);
   }

   return res;
};

export const deleteJobPostService = async (
   username: string,
   id: string,
): Promise<Model | undefined> => {
   const userExistsPromise = UserRepo.getUserByUsername(username);
   const jobPostPromise = InterviewRepo.getUserJobPostById(username, id);
   const [userExists, jobPost] = await Promise.all([
      userExistsPromise,
      jobPostPromise,
   ]);

   if (!userExists) {
      throw new ZentioError(`no account is registered with this email`, 404);
   }
   if (!jobPost) {
      throw new ZentioError(`no job post exists with this id`, 400);
   }

   const res = await InterviewRepo.deleteJobPost(username, id);

   if (!res) {
      throw new ZentioError(`failed to delete a job post`, 400);
   }

   return res;
};

export const getJobPostByIdService = async (
   username: string,
   id: string,
): Promise<Model | undefined> => {
   const userExists = await UserRepo.getUserByUsername(username);

   if (!userExists) {
      throw new ZentioError(`no account is registered with this email`, 404);
   }

   const res = await InterviewRepo.getJobPostById(username, id);
   if (!res) {
      throw new ZentioError(
         `failed to fetch a job post with the id ${id}`,
         400,
      );
   }

   return res;
};

export const generateJobPostQuestionsById = async (
   username: string,
   postId: string,
): Promise<string[]> => {
   const userExists = await UserRepo.getUserByUsername(username);
   if (!userExists) {
      throw new ZentioError(`no account is registered with this email`, 404);
   }

   const res = await InterviewRepo.getJobPostById(username, postId);

   if (!res) {
      throw new ZentioError(
         `failed to fetch a job post with the id ${postId}`,
         400,
      );
   }

   const response = await InterviewRepo.generateQuestionForJobPost(
      username,
      postId,
      {
         job_type: res.job_type,
         position: res.position,
      },
   );

   if (!response) {
      throw new ZentioError(`failed to create job questions ${postId}`, 400);
   }

   return response.questions;
};
