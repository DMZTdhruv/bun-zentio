"use client";

import { createReJobAction } from "~/actions/job";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getInterviewReport } from "~/actions/submission";
import { InterviewData } from "~/schema/submission";
import { _useAuthStore } from "~/store/user";
import { useRouter } from "next/navigation";

export default function Report({ id }: { id: string }) {
  const { isPending, data } = useQuery({
    queryKey: ["interivew-report"],
    queryFn: () => {
      return getInterviewReport({ jobPostId: id });
    },
  });
  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    return <ReportThing data={data} />;
  }
  return <div>hello</div>;
}

function ReportThing({ data }: { data: InterviewData }) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createReJobAction,
    onSuccess: (data) => {
      console.log(data);
      router.push(`/playground/${data.id}`);
      console.log("created job post successfully");
    },
  });

  const user = _useAuthStore((state) => state.user);

  const {
    interview_submission_report: report,
    interview_submission_feedback: feedback,
  } = data;

  // Map scores to ratings
  const getRating = (score: number) => {
    switch (score) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Medium";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "N/A";
    }
  };

  // Map scores to progress bar percentages
  const getPercentage = (score: number) => {
    return (score / 5) * 100;
  };

  // Map scores to progress bar colors
  const getColor = (score: number) => {
    switch (score) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-[#c6ff76]";
      case 4:
        return "bg-[#8fff76]";
      case 5:
        return "bg-[#76ff96]";
      default:
        return "bg-gray-500";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-[10px] min-h-screen px-4 py-8 pb-[400px] tracking-tight md:px-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div className="space-y-2">
            <h1 className="-translate-x-0.5 text-4xl leading-[0.8] font-semibold tracking-tighter">
              Technical Interview Report
            </h1>
            <p className="text-sm text-neutral-400">
              result of the recent interveiw
            </p>
            <p className="mt-4 flex items-center gap-4 text-base leading-none font-[500]">
              {formatDate(report.created_at)}{" "}
              <span className="text-neutral-400">{user.username}</span>
            </p>
          </div>
          <Button
            onClick={() => {
              mutate({
                jobPostId: data.interview_submission_report.job_post_id,
                weakness: data.interview_submission_feedback.weaknesses,
              });
            }}
            className="rounded-md text-base font-semibold"
          >
            Start again
          </Button>
        </div>

        <div className="mb-8 h-px w-full bg-neutral-800"></div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-[#181818] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-normal text-white">Interview pace</h2>
              <span className="text-white">{getRating(report.time_score)}</span>
            </div>
            <div className="mb-4 h-6 w-full overflow-hidden rounded-full bg-[#2e2e2e]">
              <div
                className={`h-full rounded-full ${getColor(report.time_score)}`}
                style={{ width: `${getPercentage(report.time_score)}%` }}
              ></div>
            </div>
            <p className="text-sm text-white">
              Finished the interview with a thoughtful use of time.
            </p>
          </div>

          <div className="rounded-lg bg-[#181818] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-normal text-white">Code Quality</h2>
              <span className="text-white">
                {getRating(report.quality_score)}
              </span>
            </div>
            <div className="mb-4 h-6 w-full overflow-hidden rounded-full bg-[#2e2e2e]">
              <div
                className={`h-full rounded-full ${getColor(report.quality_score)}`}
                style={{ width: `${getPercentage(report.quality_score)}%` }}
              ></div>
            </div>
            <p className="text-sm text-white">
              Evaluated based on structure, clarity, and best practices.
            </p>
          </div>

          <div className="rounded-lg bg-[#181818] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-normal text-white">
                Validation Results
              </h2>
              <span className="text-white">
                {getRating(report.validation_score)}
              </span>
            </div>
            <div className="mb-4 h-6 w-full overflow-hidden rounded-full bg-[#2e2e2e]">
              <div
                className={`h-full rounded-full ${getColor(report.validation_score)}`}
                style={{ width: `${getPercentage(report.validation_score)}%` }}
              ></div>
            </div>
            <p className="text-sm text-white">
              Assessed based on correctness and test case coverage.
            </p>
          </div>

          <div className="rounded-lg bg-[#181818] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-normal text-white">
                Problems Completed
              </h2>
              <span className="text-white">
                {getRating(report.problems_solved_score)}
              </span>
            </div>
            <div className="mb-4 h-6 w-full overflow-hidden rounded-full bg-[#2e2e2e]">
              <div
                className={`h-full rounded-full ${getColor(report.problems_solved_score)}`}
                style={{
                  width: `${getPercentage(report.problems_solved_score)}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-white">
              Reflects the number of problems successfully solved.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6 pb-[100px]">
          <div className="">
            <h2 className="mb-4 text-2xl font-medium text-white">
              Candidate Assesment
            </h2>
            <p className="ml-0.5 border-l pl-4 text-base text-white">
              {feedback.strengths}
            </p>
          </div>

          <div className="pt-4">
            <h2 className="mb-4 text-2xl font-medium text-white">
              Areas for Improvement
            </h2>

            <p className="ml-0.5 border-l pl-4 text-base text-white">
              {feedback.weaknesses}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
