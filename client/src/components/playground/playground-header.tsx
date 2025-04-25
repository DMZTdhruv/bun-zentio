"use client";
import { ChevronRight, Loader2, PanelRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobInterview } from "~/actions/interview";
import { Play } from "@phosphor-icons/react";
import { Pause } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { getSolution, incrementInterviewSolutionIndex } from "~/store/solution";
import { SubmitCodeSolutionSchema } from "~/schema/submission";
import { submitCode, submitInterview } from "~/actions/submission";
import { useRouter } from "next/navigation";

const AnimatedDigit = ({ value }: { value: string }) => {
  return (
    <div className="relative h-6 w-[10px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return {
    minuteTens: Math.floor(minutes / 10).toString(),
    minuteOnes: (minutes % 10).toString(),
    secondTens: Math.floor(seconds / 10).toString(),
    secondOnes: (seconds % 10).toString(),
  };
};

export default function PlaygroundHeader({ id }: { id: string }) {
  const [, setNoteId] = useQueryState("note");
  const [q, setQ] = useQueryState("q", { defaultValue: "0" });
  const [seconds, setSeconds] = useState(0);
  const [play, setPlay] = useState<boolean>(false);
  const { isPending: submittingCode, mutateAsync } = useMutation({
    mutationFn: submitCode,
    onSuccess: (data) => {
      toast.success("Submitted code", { description: data });
    },
    onError: (error) => {
      toast.error("failed to submit code", { description: error.message });
    },
  });
  const router = useRouter();

  const {
    isPending: submittingInterview,
    mutateAsync: submitInterviewMutateAsync,
  } = useMutation({
    mutationFn: submitInterview,
    onSuccess: (data) => {
      toast.success("Completed interview successfully");
      router.push(`/interview-report/${data}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("failed to create report");
    },
  });

  const { data, isPending, error } = useQuery({
    queryKey: ["user-job-posts", id], // Replace "interview-id" with actual id if needed
    queryFn: ({ queryKey }) => getJobInterview({ id: queryKey[1] }),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (play) {
      toast.success("Timer Started");
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        toast.success("Timer Stopped");
      }
    };
  }, [play]);

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
      <header className="text-md my-4 flex h-[42px] animate-pulse items-center justify-between rounded-md bg-neutral-900 font-semibold" />
    );
  }

  const jobPost = data.find((data) => data.type === "jobPost");
  const problems = data.find((data) => data.type === "problems");

  const getCurrentTitle = () => {
    if (isPending) {
      return "Loading...";
    }

    const question = problems.problemDetails[currentIndex];
    if (!question) return "Question not found";

    const headerSection = question.sections["headerSection"];
    return headerSection?.title || `Problem ${currentIndex + 1}`;
  };

  const handleNext = async () => {
    const nextQuestionIndex = String(Number(q) + 1);
    console.log("damn man");
    await handleSubmitCode();
    if (currentIndex >= problems.problemDetails.length - 1) return;
    incrementInterviewSolutionIndex(id, nextQuestionIndex);
    setQ(nextQuestionIndex);
  };

  const handleNextAndSubmit = async () => {
    await handleSubmitCode();
    await submitInterviewMutateAsync({
      timeScore: "39:00",
      problemsSolvedScore: "3",
      jobPostId: id,
    });
  };

  const handleSubmitCode = async () => {
    const solutionIndex = String(q ?? 0);
    const solution = getSolution(id, solutionIndex);
    const currentProblem = problems.problemDetails[Number(solutionIndex)];
    const submitCodeData: SubmitCodeSolutionSchema = {
      solution: solution,
      problemId: currentProblem.id,
      problemIndex: solutionIndex,
      interviewId: currentProblem.job_interview_id,
    };
    return await mutateAsync(submitCodeData);
  };

  const time = formatTime(seconds);
  return (
    <header className="text-md relative flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="flex items-center divide-neutral-800 rounded-lg">
            <span className="mr-4 text-2xl font-semibold capitalize">
              {jobPost?.jobDetails.title}
            </span>

            {currentIndex >= problems.problemDetails.length - 1 ? (
              <AlertDialog>
                <AlertDialogTrigger
                  className={`group border-r-none flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-2 font-semibold transition-all hover:bg-neutral-800`}
                >
                  Submit
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you wish to proceed with submitting your
                      interview?{" "}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={submittingCode}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleNextAndSubmit}
                      disabled={submittingCode || submittingInterview}
                    >
                      {submittingCode ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Yes"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger
                  className={`group border-r-none flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-2 transition-all hover:bg-neutral-800`}
                  disabled={
                    !problems.problemDetails ||
                    currentIndex >= problems.problemDetails.length - 1
                  }
                >
                  Next
                  <ChevronRight
                    size={20}
                    className={`transition-all ${problems.problemDetails && currentIndex < problems.problemDetails.length - 1 ? "group-hover:scale-125" : "opacity-50"}`}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Proceed to next question?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Would you like to proceed with next question by submitting
                      this question{" "}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={submittingCode}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={submittingCode}
                      onClick={handleNext}
                    >
                      {submittingCode ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Yes"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900 p-2 px-4 text-sm font-medium">
            {currentIndex + 1}. {getCurrentTitle()}
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center">
        <div className="group border-r-none flex items-center rounded-l-lg border border-r-0 border-neutral-800 bg-neutral-900 p-2 px-4 font-semibold transition-all hover:bg-neutral-800">
          <AnimatedDigit value={time.minuteTens} />
          <AnimatedDigit value={time.minuteOnes} />
          <span className="mx-0.5">:</span>
          <AnimatedDigit value={time.secondTens} />
          <AnimatedDigit value={time.secondOnes} />{" "}
        </div>

        <Button
          size="icon"
          onClick={() => setPlay((prev) => !prev)}
          className="group border-r-none h-full cursor-pointer rounded-none rounded-r-lg border border-neutral-800 bg-neutral-900 px-2 py-3 font-semibold text-white transition-all hover:bg-neutral-800"
        >
          <AnimatePresence mode="wait" initial={false}>
            {play ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.08 }}
              >
                <Pause size={24} weight="fill" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.08 }}
              >
                <Play size={24} weight="fill" />
              </motion.div>
            )}
          </AnimatePresence>{" "}
        </Button>
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
