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
   public: z.boolean().default(true),

   // optional
   title: z.string().optional(),
   company: z.string().optional(),
   location: z.string().optional(),

   // what ai will make
   job_posting: jobPostingSchema,
   created_by: z.string().optional(),
});

export const jobPostCreation = jobPostSchema.omit({
   job_posting: true,
});

export const jobInterviewQuestionsCreation = z.object({
   postId: z.string(),
   job_type: z.string(),
});

export const deleteJobPostRequest = z.object({
   id: z.string(),
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
export type JobPostCreation = z.infer<typeof jobPostCreation>;
export type JobInterviewQuestionsCreation = z.infer<
   typeof jobInterviewQuestionsCreation
>;
