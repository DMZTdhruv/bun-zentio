"use client";
import { motion, AnimatePresence } from "motion/react";
import { _useJobPostStore } from "~/store/job-post";
import { Button } from "../ui/button";
import { useQueryState } from "nuqs";

const RightSidePanel = () => {
  const jobPosts = _useJobPostStore((state) => state.jobPosts);
  const [jobPostId, setJobPostId] = useQueryState("job-post");
  const selectedJob = jobPosts.find((jobPost) => jobPost.id === jobPostId);

  return (
    <>
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className={`absolute inset-0 ${selectedJob ? "bg-black/40" : "bg-neutral-100/0"} transition-all`}
            />
            <motion.div
              initial={{ transform: `translateX(100%)` }}
              animate={{ transform: `translateX(0%)` }}
              exit={{ transform: `translateX(100%)` }}
              className={`absolute inset-0 left-1/2 z-50 bg-neutral-800 transition-all`}
            >
              <button onClick={() => setJobPostId(null)}>Close</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RightSidePanel;
