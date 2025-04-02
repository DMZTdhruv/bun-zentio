"use client";

// import { _useJobPostStore } from "~/store/job-post";
import JobPostCard from "./job-post-card";
import { useQuery } from "@tanstack/react-query";
import { getJobPostsQueryOptions } from "~/actions/interview/query-options";

const JobPosting = () => {
  const { data, isPending } = useQuery(getJobPostsQueryOptions);
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {isPending
        ? [1, 2, 3, 4].map((value) => {
            return (
              <div
                key={value}
                className="h-[190px] animate-pulse rounded-md bg-neutral-900"
              />
            );
          })
        : data?.map((data) => {
            return <JobPostCard key={data.id} {...data} />;
          })}
    </div>
  );
};

export default JobPosting;
