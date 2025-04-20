"use client";
import { create } from "zustand";
import { JobPostSchema } from "~/schema/job";
import { createSelectors } from "./selector";

interface JobPostStore {
  jobPosts: JobPostSchema[];
  communityJobPosts: JobPostSchema[];
  setJobPosts: (post: JobPostSchema[]) => void;
  setCommunityJobPost: (post: JobPostSchema[]) => void;
  addCommunityJobPost: (post: JobPostSchema) => void;
  addJobPost: (post: JobPostSchema) => void;
  deleteJobPost: (d: string) => void;
}

export const _useJobPostStore = create<JobPostStore>()((set) => ({
  jobPosts: [],
  communityJobPosts: [],
  setJobPosts: (jobPosts) => set({ jobPosts }),
  setCommunityJobPost: (communityJobPosts) => set({ communityJobPosts }),
  addJobPost: (post) =>
    set((state) => ({
      jobPosts: [...state.jobPosts, post],
    })),
  addCommunityJobPost: (post) =>
    set((state) => ({
      jobPosts: [...state.jobPosts, post],
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

export const useJobPosts = createSelectors(_useJobPostStore);
