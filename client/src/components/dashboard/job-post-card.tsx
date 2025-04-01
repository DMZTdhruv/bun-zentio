"use client";

import { JobPostSchema } from "~/schema/job";
import { useQueryState } from "nuqs";
import JobPostBadge from "./job-post-badge";
import { motion } from "motion/react";

const JobPostCard = (props: JobPostSchema) => {
  const { job_type, position, title, company, location, id, job_posting } =
    props;
  const tags = [job_type, position, job_posting.company.salary];

  const jobLocation = location ? location : job_posting.company.location;
  tags.push(jobLocation);

  const [, setJobPostId] = useQueryState("job-post");
  return (
    <motion.div
      className="bg-job-card group relative isolate h-[190px] rounded-md border border-neutral-800 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-800/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <button
        className="absolute inset-0 cursor-pointer"
        onClick={() => {
          setJobPostId(id);
        }}
      ></button>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <small className="text-neutral-400">{company}</small>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <JobPostBadge key={`${index}_${tag}`} title={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default JobPostCard;
