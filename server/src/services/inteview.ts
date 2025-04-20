import type { InferSelectModel } from "drizzle-orm";
import { UserRepo } from "../repository/auth";
import { InterviewRepo } from "../repository/interview";
import { ZentioError } from "../utils/utils";
import type { JobPostCreation } from "../schema/job";
import type { JobPost } from "../db/schema/job.sql";

type Model = InferSelectModel<typeof JobPost>;

export const createJobPostService = async (
   userId: string,
   data: JobPostCreation,
): Promise<Model> => {
   const userExists = await UserRepo.getUserById(userId);
   if (!userExists) {
      throw new ZentioError(`no account registered with this email`, 404);
   }

   const res = await InterviewRepo.createAiMockInterviewJobPost(userId, data);
   if (!res) {
      throw new ZentioError(`failed to create job post`, 400);
   }

   return res;
};

export const getUserJobPostsService = async (
   userId: string,
): Promise<Model[]> => {
   const userExists = await UserRepo.getUserById(userId);
   if (!userExists) {
      throw new ZentioError(`no account registered with this email`, 404);
   }
   const res = await InterviewRepo.getUserJobPosts(userId);
   if (!res) {
      throw new ZentioError(`failed to fetch job posts`, 400);
   }

   return res;
};

export const getCommunityJobPostsService = async (
   userId: string,
): Promise<Model[]> => {
   const userExists = await UserRepo.getUserById(userId);
   if (!userExists) {
      throw new ZentioError(`no account registered with this email`, 404);
   }
   const res = await InterviewRepo.getCommunityJobPosts(userId);
   if (!res) {
      throw new ZentioError(`failed to fetch community job posts`, 400);
   }

   return res;
};

export const deleteJobPostService = async (
   userId: string,
   id: string,
): Promise<Model | undefined> => {
   const userExistsPromise = UserRepo.getUserById(userId);
   const jobPostPromise = InterviewRepo.getUserJobPostById(userId, id);
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

   const res = await InterviewRepo.deleteJobPost(userId, id);

   if (!res) {
      throw new ZentioError(`failed to delete a job post`, 400);
   }

   return res;
};

export const getJobPostByIdService = async (
   userId: string,
   id: string,
): Promise<Model | undefined> => {
   const userExists = await UserRepo.getUserById(userId);

   if (!userExists) {
      throw new ZentioError(`no account is registered with this email`, 404);
   }

   const res = await InterviewRepo.getJobPostById(userId, id);

   if (!res) {
      throw new ZentioError(
         `failed to fetch a job post with the id ${id}`,
         400,
      );
   }

   return res;
};

export const getJobPostByTitleService = async (
   userId: string,
   title: string,
): Promise<Model[]> => {
   const res = await InterviewRepo.getJobPostByTitle(userId, title);
   return res;
};

export const getJobInterviewService = async (
   userId: string,
   jobPostId: string,
) => {
   const userExists = await UserRepo.getUserById(userId);
   if (!userExists) {
      throw new ZentioError(`no account is registered with this email`, 404);
   }

   const data = await InterviewRepo.getInterviewByJobPostId(jobPostId);
   if (!data) {
      throw new ZentioError("Interview failed to load", 404);
   }
   return data;
};
