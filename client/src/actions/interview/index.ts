import apiClient, { SuccessResponse } from "~/lib/api-client";
import { CreateJobPost, JobPostSchema } from "~/schema/job";
import { JobInterviewRootSchema } from "~/schema/question";
import {
  addJobPost,
  deleteJobPost,
  getJobPosts,
  setJobPosts,
} from "~/store/job-post";
export const createJobAction = async (data: CreateJobPost) => {
  return apiClient
    .post<SuccessResponse<JobPostSchema>>("interview/create-job-post", data, {
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
    .get<SuccessResponse<JobPostSchema[]>>("interview/user/job-post", {
      withCredentials: true,
    })
    .then((res) => {
      const data = res.data.data;
      setJobPosts(data ?? []);
      return data;
    });

export const deleteJobPostAction = async (id: string) =>
  apiClient
    .delete<SuccessResponse<JobPostSchema>>(
      `interview/user/delete-job-post/${id}`,
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      console.log("deleted");
      deleteJobPost(id);
      const posts = getJobPosts();
      console.log(posts);
      return res.data.data;
    });

export const getJobById = async (id: string) =>
  await apiClient
    .delete<SuccessResponse<JobPostSchema>>(`interview/job-post/${id}`, {
      withCredentials: true,
    })
    .then((res) => res.data.data);

export const getJobInterview = async (id: string) =>
  apiClient
    .get<SuccessResponse<JobInterviewRootSchema>>(
      `interview/job-interview/${id}`,
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
