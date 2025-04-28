import { create } from "zustand";

type Solution = Partial<Record<number, string | undefined>>;
type InterviewRound = Partial<Record<string, Solution | undefined>>;
type InterviewSolutionIndex = Partial<Record<string, string | undefined>>;

interface SolutionStore {
  interviewRound: InterviewRound;
  interviewSolutionIndex: InterviewSolutionIndex;
  incrementInterviewSolutionIndex: (itrwId: string, index: string) => void;
  updateInterviewRound: (
    itrwId: string,
    solId: string,
    solution: string,
  ) => void;
}

export const useSolutionStore = create<SolutionStore>((set, get) => ({
  interviewRound: {},
  interviewSolutionIndex: {},
  incrementInterviewSolutionIndex: (itrwId, index) => {
    const prev = get().interviewSolutionIndex;
    set({
      interviewSolutionIndex: {
        ...prev,
        [itrwId]: index,
      },
    });
  },
  updateInterviewRound: (itrwId, solId, solution) => {
    const prev = get().interviewRound;
    set({
      interviewRound: {
        ...prev,
        [itrwId]: {
          ...(prev[itrwId] || {}),
          [solId]: solution,
        },
      },
    });
  },
}));

export const incrementInterviewSolutionIndex =
  useSolutionStore.getState().incrementInterviewSolutionIndex;
export const updateInterviewRound =
  useSolutionStore.getState().updateInterviewRound;
export const getSolution = (itrwId: string, solId: string) => {
  const code = useSolutionStore.getState().interviewRound;
  const solutionRecord = code[itrwId];
  const solutionCode = solutionRecord ? (solutionRecord[solId] ?? "") : "";
  return solutionCode as string | undefined;
};
