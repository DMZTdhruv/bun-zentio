"use client";

import { PanelRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useQueryState } from "nuqs";
const LazyZentioEditor = dynamic(
  () => import("~/components/editor/pl-editor"),
  {
    ssr: false,
    loading: () => <div>loading..</div>,
  },
);

const PlaygroundNotesPanel = () => {
  const [noteId, setNoteId] = useQueryState("note");
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

            <LazyZentioEditor
              value={[
                {
                  children: [
                    {
                      text: "Hello world",
                    },
                  ],
                  type: "h1",
                  id: "sQcxjlmM2W",
                },
                {
                  children: [
                    {
                      text: "nice to meet you",
                    },
                  ],
                  type: "p",
                  id: "5y6L4t9BY9",
                },
                {
                  type: "p",
                  id: "7pQNrN2cML",
                  children: [
                    {
                      text: "take your notes here",
                    },
                  ],
                },
                {
                  type: "p",
                  id: "mBzfmX_o4C",
                  children: [
                    {
                      text: "hehe",
                    },
                  ],
                  indent: 1,
                  listStyleType: "disc",
                },
                {
                  type: "p",
                  id: "jh4vpjmFqR",
                  indent: 1,
                  listStyleType: "disc",
                  children: [
                    {
                      text: "nice",
                    },
                  ],
                  listStart: 2,
                },
                {
                  type: "p",
                  id: "2A4um2Vtyw",
                  indent: 1,
                  listStyleType: "disc",
                  listStart: 3,
                  children: [
                    {
                      text: "life",
                    },
                  ],
                },
                {
                  children: [
                    {
                      type: "code_line",
                      id: "4y8VMD1DP2",
                      children: [
                        {
                          text: 'console.log("hello world")',
                        },
                      ],
                    },
                  ],
                  type: "code_block",
                  id: "opoPX7MDY0",
                },
                {
                  children: [
                    {
                      text: "",
                    },
                  ],
                  type: "hr",
                  id: "APD3VpyAOA",
                },
                {
                  children: [
                    {
                      text: "lmao great xD",
                    },
                  ],
                  type: "p",
                  id: "LlKosgVW2G",
                },
                {
                  type: "hr",
                  id: "A6_pCqzlUa",
                  children: [
                    {
                      text: "",
                    },
                  ],
                },
                {
                  type: "p",
                  id: "3kEI09NQh8",
                  children: [
                    {
                      text: "see ya hehe “:3”",
                    },
                  ],
                },
                {
                  children: [
                    {
                      text: "",
                    },
                  ],
                  type: "p",
                  id: "9l_1q2dNDN",
                },
              ]}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaygroundNotesPanel;
