import { queryOptions } from "@tanstack/react-query";
import { getUserJobsAction, getCommunityJobPost } from ".";

export const getJobPostsQueryOptions = queryOptions({
  queryKey: ["user-job-posts"],
  queryFn: getUserJobsAction,
});

export const getCommunityJobPostQueryOptions = queryOptions({
  queryKey: ["community-job-post"],
  queryFn: getCommunityJobPost,
});
