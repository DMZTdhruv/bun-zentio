"use client";

import { useQueryState } from "nuqs";
import { CommunityJobPosting, UserJobPosting } from "./job-postings";
import { useQuery } from "@tanstack/react-query";
import { getJobPostByTitle } from "~/actions/job";
import { useDebounce } from "use-debounce";
import JobPostCard from "./job-post-card";

const JobMarket = () => {
  const [name] = useQueryState("name");
  const [debouncedName] = useDebounce(name, 500); // debounce delay in ms

  const { data, isPending } = useQuery({
    queryFn: () => getJobPostByTitle(debouncedName),
    queryKey: ["job-post-title", debouncedName],
    enabled: !!debouncedName, // avoid firing on empty input
  });

  return (
    <section className="mx-auto mt-4 flex w-full max-w-7xl flex-col gap-8 px-8">
      {data ? (
        <div>
          <header className="font-medium">Searching jobs for {name}</header>
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
        </div>
      ) : (
        <>
          <div>
            <header className="font-medium">Created By You</header>
            <UserJobPosting />
          </div>
          <div>
            <header className="font-medium">Created By Community</header>
            <CommunityJobPosting />
          </div>
        </>
      )}
    </section>
  );
};

export default JobMarket;
