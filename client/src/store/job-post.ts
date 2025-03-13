"use client";

import { create } from "zustand";
import { JobPostSchema } from "~/schema/job-post";

interface JobPostStore {
  jobPosts: JobPostSchema[];
  setJobPosts: (jobPosts: JobPostSchema[]) => void;
}

export const _useJobPostStore = create<JobPostStore>()((set) => ({
  jobPosts: [
    {
      id: "1",
      title: "Frontend Developer",
      description:
        "Building modern web applications with React and TypeScript.",
      company: "OpenAI",
      job_type: "remote",
      position: "senior",
      job_time: "full-time",
      location: "San Francisco, CA",
      public: true,
    },
    {
      id: "2",
      title: "Backend Developer",
      description: "Develop scalable backend services with Node.js and Go.",
      company: "Google",
      job_type: "remote",
      position: "mid",
      location: "New York, NY",
      job_time: "full-time",
      public: true,
    },
    {
      id: "3",
      title: "Full Stack Engineer",
      description:
        "Work on both frontend and backend technologies, including databases.",

      job_time: "full-time",
      company: "Microsoft",
      job_type: "hybrid",
      position: "junior",

      location: "Seattle, WA",
      public: false,
    },
    {
      id: "4",
      title: "Machine Learning Engineer",
      description: "Develop AI models and deploy them at scale.",
      company: "Meta",
      job_type: "remote",
      position: "senior",
      job_time: "full-time",
      location: "Menlo Park, CA",
      public: true,
    },
    {
      id: "5",
      title: "DevOps Engineer",
      description: "Manage CI/CD pipelines and infrastructure automation.",
      company: "Amazon",
      job_type: "remote",
      position: "mid",
      job_time: "part-time",
      location: "Austin, TX",
      public: false,
    },
  ],
  setJobPosts: (jobPosts) => set({ jobPosts }),
}));
