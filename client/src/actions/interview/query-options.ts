import { queryOptions } from "@tanstack/react-query";
import { getJobInterview, getUserJobsAction } from ".";

export const getJobPostsQueryOptions = queryOptions({
  queryKey: ["user-job-posts"],
  queryFn: getUserJobsAction,
});
