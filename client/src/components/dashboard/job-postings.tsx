"use client";

import JobPostCard from "./job-post-card";
import { useQuery } from "@tanstack/react-query";
import { getJobPostsQueryOptions } from "~/actions/job/query-options";
import { getCommunityJobPostQueryOptions } from "~/actions/job/query-options";

export const UserJobPosting = () => {
  const { data = [], isPending } = useQuery(getJobPostsQueryOptions);
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {isPending
        ? [1, 2, 3, 4].map((value) => (
            <div
              key={value}
              className="h-[190px] animate-pulse rounded-md bg-neutral-900"
            />
          ))
        : data.map((data) => <JobPostCard key={data.id} {...data} />)}
    </div>
  );
};

export const CommunityJobPosting = () => {
  const { data, isPending } = useQuery(getCommunityJobPostQueryOptions);
  return (
    <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {isPending ? (
        [1, 2, 3, 4].map((value) => {
          return (
            <div
              key={value}
              className="h-[190px] animate-pulse rounded-md bg-neutral-900"
            />
          );
        })
      ) : data.length !== 0 ? (
        data?.map((data) => {
          return <JobPostCard key={data.id} {...data} />;
        })
      ) : (
        <p className="text-neutral-400">No community jobs posts right now</p>
      )}
    </div>
  );
};
