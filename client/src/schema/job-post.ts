import { z } from "zod";

export const jobPostingSchema = z.object({
  type: z.string(),
  level: z.string(),
  title: z.string(),
  company: z.object({
    name: z.string(),
    location: z.string(),
    salary: z.string(),
  }),
  benefits: z.array(z.string()),
  description: z.string(),
  requirements: z.array(z.string()),
  responsibilities: z.array(z.string()),
});

export const jobPostSchema = z.object({
  // what we want from user
  id: z.string(),
  title: z.string().min(3),
  description: z.string().min(20),
  company: z.string(),
  job_type: z.enum([
    "frontend",
    "backend",
    "fullstack",
    "mobile",
    "devops",
    "machine learning",
    "cyber security",
  ]),
  position: z.enum(["senior", "mid", "junior"]),
  location: z.string(),
  public: z.boolean().default(true),

  // what ai will make
  job_posting: jobPostingSchema,
  created_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createJobPost = z.object({
  // what we want from user necessary info
  company: z.string().min(3),
  description: z.string().min(20),
  job_type: z.enum([
    "frontend",
    "backend",
    "fullstack",
    "mobile",
    "devops",
    "machine learning",
    "cyber security",
  ]),
  position: z.enum(["senior", "mid", "junior"]),
  created_by: z.string().optional(),
  public: z.boolean().default(true),

  // what ai will make
  location: z.string().nullable(),
  job_posting: z.record(z.unknown()).optional(),
  title: z.string().nullable(),
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
export type CreateJobPost = z.infer<typeof createJobPost>;
export type JobPostingSchema = z.infer<typeof jobPostingSchema>;
