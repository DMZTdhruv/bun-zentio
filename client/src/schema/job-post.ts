import { z } from "zod";

export const jobPostSchema = z.object({
  // what we want from user
  id: z.string(),
  title: z.string().min(3),
  description: z.string().min(20),
  company: z.string().optional(),
  job_type: z.enum(["remote", "hybrid"]),
  job_time: z.enum(["full-time", "part-time"]),
  position: z.enum(["senior", "mid", "junior"]),
  location: z.string().optional(),
  public: z.boolean().default(true),

  // what ai will make
  job_posting: z.record(z.unknown()).optional(),
  created_by: z.string().optional(),
});

export const createJobPost = z.object({
  // what we want from user necessary info
  company: z.string().min(3),
  description: z.string().min(20),
  job_type: z.enum(["frontend", "backend"]),
  position: z.enum(["senior", "mid", "junior"]),
  created_by: z.string().optional(),
  public: z.boolean().default(true),

  // what ai will make
  location: z.string().optional().default("sf"),
  job_posting: z.record(z.unknown()).optional(),
  title: z.string().min(3).optional(),
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
export type CreateJobPost = z.infer<typeof createJobPost>;
