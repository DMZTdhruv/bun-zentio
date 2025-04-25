import { create } from "zustand";
import { createSelectors } from "./selector";

interface NoteStore {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  globalNoteContent: any[] | null;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  interviewNoteContent: Record<string, any[]> | null;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  setGlobalNoteContent: (content: any[]) => void;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  setInterviewNoteContent: (id: string, content: any[]) => void;
}

export const _useNoteStore = create<NoteStore>()((set) => ({
  globalNoteContent: [
    {
      children: [
        {
          text: "Let's cook something together",
        },
      ],
      type: "h1",
      id: "6Qs7o4vW12",
    },
    {
      children: [
        {
          text: "Start cooking with your zentio editor today.",
        },
      ],
      type: "p",
      id: "QcQcNngTQs",
    },
    {
      children: [
        {
          text: "",
        },
      ],
      type: "p",
      id: "oX94X-dEVX",
    },
    {
      children: [
        {
          text: "",
        },
      ],
      type: "p",
      id: "M9EM_-57KR",
    },
  ],
  interviewNoteContent: {},
  setGlobalNoteContent: (content) =>
    set({
      globalNoteContent: content,
    }),
  setInterviewNoteContent: (id, content) =>
    set((state) => ({
      interviewNoteContent: {
        ...state.interviewNoteContent,
        [id]: content,
      },
    })),
}));

export const useNoteStore = createSelectors(_useNoteStore);
export const updateGlobalNoteContent =
  _useNoteStore.getState().setGlobalNoteContent;
export const updateInterviewNoteContent =
  _useNoteStore.getState().setInterviewNoteContent;
