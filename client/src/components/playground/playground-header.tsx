"use client";
import { ChevronLeft, ChevronRight, PanelRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { getJobInterview } from "~/actions/interview";

export default function PlaygroundHeader({ id }: { id: string }) {
  const [, setNoteId] = useQueryState("note");
  const [q, setQ] = useQueryState("q", { defaultValue: "0" });

  const { data, isPending, error } = useQuery({
    queryKey: ["user-job-posts", id], // Replace "interview-id" with actual id if needed
    queryFn: ({ queryKey }) => getJobInterview(queryKey[1]),
  });

  const currentIndex = parseInt(q || "0");

  if (error) {
    return (
      <header className="text-md flex items-center justify-between py-4 font-semibold">
        An error occurred {error.message}
      </header>
    );
  }

  if (isPending) {
    return (
      <header className="text-md my-4 flex h-[42px] animate-pulse items-center justify-between rounded-md bg-neutral-900 font-semibold"></header>
    );
  }

  const jobPost = data.find((data) => data.type === "jobPost");
  const problems = data.find((data) => data.type === "problems");

  const handleNext = () => {
    if (
      problems.problemDetails ||
      currentIndex < problems.problemDetails.length - 1
    ) {
      setQ((currentIndex + 1).toString());
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setQ((currentIndex - 1).toString());
    }
  };

  const getCurrentTitle = () => {
    if (isPending) {
      return "Loading...";
    }

    const question = problems.problemDetails[currentIndex];
    if (!question) return "Question not found";

    const headerSection = question.sections["headerSection"];
    return headerSection?.title || `Problem ${currentIndex + 1}`;
  };

  return (
    <header className="text-md flex items-center justify-between py-4 font-semibold">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="flex items-center divide-neutral-800 rounded-lg">
            <span className="mr-4 text-2xl font-semibold capitalize">
              {jobPost?.jobDetails.title}
            </span>
            <button
              className="group border-r-none cursor-pointer rounded-l-lg border border-neutral-800 bg-neutral-900 p-2 transition-all hover:bg-neutral-800"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft
                size={20}
                className={`transition-all ${currentIndex > 0 ? "group-hover:scale-125" : "opacity-50"}`}
              />
            </button>
            <button
              className="group border-r-none cursor-pointer rounded-r-lg border border-neutral-800 bg-neutral-900 p-2 transition-all hover:bg-neutral-800"
              onClick={handleNext}
              disabled={
                !problems.problemDetails ||
                currentIndex >= problems.problemDetails.length - 1
              }
            >
              <ChevronRight
                size={20}
                className={`transition-all ${problems.problemDetails && currentIndex < problems.problemDetails.length - 1 ? "group-hover:scale-125" : "opacity-50"}`}
              />
            </button>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900 p-2 px-4 text-base font-medium">
            {currentIndex + 1}. {getCurrentTitle()}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setNoteId("1");
        }}
        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-[6px] hover:bg-neutral-800"
      >
        <PanelRight className="size-4" />
        Notes
      </button>
    </header>
  );
}
