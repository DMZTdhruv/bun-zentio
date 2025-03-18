"use client";
import { create } from "zustand";
import { JobPostSchema } from "~/schema/job-post";

interface JobPostStore {
  jobPosts: JobPostSchema[];
  setJobPosts: (jobPosts: JobPostSchema[]) => void;
  addJobPost: (jobPost: JobPostSchema) => void;
  deleteJobPost: (id: string) => void;
}

export const _useJobPostStore = create<JobPostStore>()((set) => ({
  jobPosts: [],
  setJobPosts: (jobPosts) => set({ jobPosts }),
  addJobPost: (jobPost) =>
    set((state) => ({
      jobPosts: [...state.jobPosts, jobPost],
    })),
  deleteJobPost: (id) =>
    set((state) => ({
      jobPosts: state.jobPosts.filter((post) => post.id !== id),
    })),
}));

export const setJobPosts = _useJobPostStore.getState().setJobPosts;
export const addJobPost = _useJobPostStore.getState().addJobPost;
export const deleteJobPost = _useJobPostStore.getState().deleteJobPost;
export const getJobPosts = () => _useJobPostStore.getState().jobPosts;

export default _useJobPostStore;
