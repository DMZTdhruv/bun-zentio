import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useQueryState } from "nuqs";

const PlaygroundNotesPanel = () => {
  const [noteId, setNoteId] = useQueryState("job-post");
  return (
    <AnimatePresence>
      {noteId && (
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
            onClick={() => setNoteId(null)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
              ease: [0.76, 0, 0.24, 1],
            }}
            className={`fixed top-0 right-0 bottom-0 z-50 w-1/2 bg-[#171717] shadow-lg`}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaygroundNotesPanel;
