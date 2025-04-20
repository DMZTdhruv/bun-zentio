"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import { _useJobPostStore } from "~/store/job-post";
import { Button } from "../ui/button";
import { useQueryState } from "nuqs";
import { JobPostingSchema } from "~/schema/job";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import JobPostBadge from "./job-post-badge";
import { PanelRight } from "lucide-react";
import { _useAuthStore } from "~/store/user";
import { useMutation } from "@tanstack/react-query";
import { deleteJobPostAction } from "~/actions/job";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

const RightSidePanel = () => {
  const jobPosts = _useJobPostStore((state) => state.jobPosts);
  const [jobPostId, setJobPostId] = useQueryState("job-post");
  const selectedJob = jobPosts.find((jobPost) => jobPost.id === jobPostId);
  const pathName = usePathname();
  console.log({
    selectedJob,
    jobPosts,
  });

  return (
    <>
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(1px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
              }}
              className={`fixed inset-0 z-40 bg-black/40`}
              onClick={() => setJobPostId(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
              }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-full bg-[#171717] shadow-lg lg:w-1/2`}
            >
              <div className="relative inset-0">
                {pathName !== "/playground" && (
                  <button
                    onClick={() => setJobPostId(null)}
                    className="bg-right-side-panel/30 group absolute top-6 left-6 z-50 cursor-pointer rounded-md p-2 text-neutral-300 backdrop-blur-xl hover:text-white"
                  >
                    <PanelRight
                      size={24}
                      className="transition-all group-active:scale-75"
                    />
                  </button>
                )}
                {selectedJob.job_posting && (
                  <JobPostingDetails
                    data={selectedJob.job_posting}
                    created_by={selectedJob.created_by}
                    jobPostId={jobPostId}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const JobPostingDetails = ({
  data,
  created_by,
  jobPostId,
}: {
  data: JobPostingSchema;
  created_by: string;
  jobPostId: string | null;
}) => {
  const userId = _useAuthStore.getState().user.id;
  const navigate = useRouter();
  const userJobPost = created_by === userId;
  return (
    <ScrollArea className="h-dvh max-h-screen">
      <Card className="mt-[50px] rounded-none border-none bg-transparent px-2 py-6 shadow-none">
        <CardHeader>
          <CardTitle className="text-5xl">{data.type} Developer</CardTitle>
          <CardDescription>
            <div className="flex gap-2 py-2">
              {Object.entries(data.company).map(([key, value]) => {
                return (
                  <JobPostBadge
                    key={key}
                    title={value}
                    className="text-white"
                  />
                );
              })}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{data.title}</h3>
            <p className="text-neutral-400">{data.description}</p>
            <div className="mt-4 space-y-4">
              <Separator />
              <div className="space-x-2">
                <Button
                  className="text-lg font-semibold"
                  onClick={() => navigate.push(`/playground/${jobPostId}`)}
                >
                  Start now
                </Button>
                {userJobPost && jobPostId && <DeleteButton id={jobPostId} />}
              </div>
            </div>
          </div>
          <JobPostSection
            title="Responsibilities"
            details={data.responsibilities}
          />
          <JobPostSection title="Requirements" details={data.requirements} />
          <JobPostSection title="Benefits" details={data.benefits} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default RightSidePanel;

const DeleteButton = ({ id }: { id: string }) => {
  const [, setJobPostId] = useQueryState("job-post");
  const { isPending, mutate } = useMutation({
    mutationFn: deleteJobPostAction,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setJobPostId(null);
    },
  });

  return (
    <Button
      variant={"destructive"}
      type="button"
      disabled={isPending}
      onClick={() => mutate(id)}
      className="text-lg font-semibold"
    >
      {isPending ? "Deleting.." : "Delete"}
    </Button>
  );
};

type JobPostSectionProps = {
  title: string;
  details: string[];
};

const JobPostSection = ({ title, details }: JobPostSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <ul className="space-y-1 text-lg text-neutral-400">
        {details.map((data) => {
          return (
            <li key={data} className="ml-5 list-disc">
              {data}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
