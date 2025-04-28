import apiClient, { SuccessResponse } from "~/lib/api-client";
import {
  InterviewData,
  SubmitCodeSolutionSchema,
  SubmitInterviewResultSchema,
} from "~/schema/submission";

export const submitCode = async (data: SubmitCodeSolutionSchema) => {
  return apiClient
    .post<SuccessResponse<string>>("/submission/code", data, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
};

export const submitInterview = async (data: SubmitInterviewResultSchema) => {
  return apiClient
    .post<SuccessResponse<string>>("/submission/interview", data, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
};

export const getInterviewReport = async (data: { jobPostId: string }) => {
  return apiClient
    .get<SuccessResponse<InterviewData>>("/submission/interview-report", {
      params: data,
      withCredentials: true,
    })
    .then((res) => res.data.data);
};
