"use client";

import { PanelRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useQueryState } from "nuqs";
import { InterviewZentioEditor } from "../editor/pl-editor";
import { useNoteStore } from "~/store/note";
import { useMemo } from "react";

const PlaygroundNotesPanel = ({ id }: { id: string }) => {
  const [noteId, setNoteId] = useQueryState("note");
  const { interviewNoteContent } = useNoteStore();
  const editorContent = useMemo(() => interviewNoteContent[id], [id]);
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
            className={`fixed top-0 right-0 bottom-0 z-50 max-h-screen w-1/2 overflow-hidden bg-[#171717] shadow-lg`}
          >
            <button
              onClick={() => setNoteId(null)}
              className="bg-right-side-panel/30 group absolute top-16 right-4 z-50 cursor-pointer rounded-md p-2 text-neutral-300 backdrop-blur-xl hover:text-white"
            >
              <PanelRight
                size={24}
                className="transition-all group-active:scale-75"
              />
            </button>

            <InterviewZentioEditor id={id} value={editorContent} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaygroundNotesPanel;
