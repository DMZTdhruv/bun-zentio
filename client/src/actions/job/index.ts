import apiClient, { SuccessResponse } from "~/lib/api-client";
import { CreateJobPost, JobPostSchema } from "~/schema/job";
import {
  addJobPost,
  deleteJobPost,
  getJobPosts,
  setJobPosts,
} from "~/store/job-post";

export const createJobAction = async (data: CreateJobPost) => {
  return apiClient
    .post<SuccessResponse<JobPostSchema>>("job/create-job-post", data, {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      if (data) {
        addJobPost(data);
      }
    });
};

export const getUserJobsAction = async () =>
  apiClient
    .get<SuccessResponse<JobPostSchema[]>>("job/user/job-post", {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      setJobPosts(data ?? []);
      return data;
    });

export const getCommunityJobPost = async () => {
  return apiClient
    .get<SuccessResponse<JobPostSchema[]>>("job/idk", {
      withCredentials: true,
    })
    .then((res) => res.data.data ?? []);
};

export const deleteJobPostAction = async (id: string) =>
  apiClient
    .delete<SuccessResponse<JobPostSchema>>(`job/user/delete-job-post/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("deleted");
      deleteJobPost(id);
      const posts = getJobPosts();
      console.log(posts);
      return res.data.data;
    });

export const getJobById = async (id: string) =>
  await apiClient
    .delete<SuccessResponse<JobPostSchema>>(`job/job-post/${id}`, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
