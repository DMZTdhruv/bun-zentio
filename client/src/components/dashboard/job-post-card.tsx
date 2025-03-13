"use client";

import { JobPostSchema } from "~/schema/job-post";
import { useQueryState } from "nuqs";

const JobPostCard = (props: JobPostSchema) => {
  const { job_type, position, title, job_time, company, location, id } = props;
  const tags = [job_type, position, job_time, location];

  const [, setJobPostId] = useQueryState("job-post");
  return (
    <div className="bg-job-card group relative isolate h-[190px] rounded-md border border-neutral-800 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-800/50">
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
          {tags.map((tag) => (
            <BadgeTag key={tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BadgeTag = ({ title }: { title: string | undefined }) => {
  return (
    <span className="w-fit rounded-full border bg-neutral-800 px-4 py-1 font-medium group-hover:border-neutral-700">
      {title}
    </span>
  );
};

export default JobPostCard;
