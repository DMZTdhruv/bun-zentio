import apiClient, { SuccessResponse } from "~/lib/api-client";
import { JobInterviewRootSchema } from "~/schema/question";

export const getJobInterview = async ({ id }: { id: string }) =>
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
