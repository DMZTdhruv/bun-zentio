"use client";

import { _useJobPostStore } from "~/store/job-post";
import JobPostCard from "./job-post-card";

const JobPosting = () => {
  const jobPosts = _useJobPostStore((state) => state.jobPosts);
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {jobPosts.map((jobpost) => (
        <JobPostCard key={jobpost.id} {...jobpost} />
      ))}
    </div>
  );
};

export default JobPosting;
