import { z } from "zod";

export const jobPostSchema = z.object({
   // what we want from user
   description: z.string().min(20),
   job_type: z.enum(["frontend", "backend"]),
   position: z.enum(["senior", "mid", "junior"]),
   public: z.boolean().default(true),

   // optional
   title: z.string().min(3).optional(),
   company: z.string().optional(),
   location: z.string().optional(),

   // what ai will make
   job_posting: z.record(z.unknown()).optional(),

   created_by: z.string().optional(),
});

export const jobPostCreation = jobPostSchema.omit({
   job_posting: true,
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
export type JobPostCreation = z.infer<typeof jobPostCreation>;
