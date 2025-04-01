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

const HeaderSectionSchema = z.object({
  type: z.literal("header"),
  title: z.string(),
  description: z.string(),
});

const ExampleSchema = z.object({
  number: z.string(),
  inputs: z.string(),
  output: z.string(),
});

const ExamplesSectionSchema = z.object({
  type: z.literal("examples"),
  examples: z.array(ExampleSchema),
});

const ConstraintsSectionSchema = z.object({
  type: z.literal("constraints"),
  constraints: z.array(z.string()),
});

const AdditionalInfoSectionSchema = z.object({
  type: z.literal("additional_information"),
  description: z.string(),
});

const SectionSchema = z.union([
  HeaderSectionSchema,
  ExamplesSectionSchema,
  ConstraintsSectionSchema,
  AdditionalInfoSectionSchema,
]);

export const QuestionSchema = z.object({
  type: z.literal("problem"),
  sections: z.array(SectionSchema),
});

export const jobInterview = z.object({
  id: z.string(),
  questions: z.array(QuestionSchema),
  job_post_id: z.string(),
  created_by: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const jobInterviewResponse = z.object({
  interview: jobInterview,
  job_post: jobPostSchema.pick({
    id: true,
    job_type: true,
    title: true,
  }),
});

export type AdditionalInfoSection = {
  type: "additional_information";
  description: string;
};
export type JobPostSchema = z.infer<typeof jobPostSchema>;
export type CreateJobPost = z.infer<typeof createJobPost>;
export type JobPostingSchema = z.infer<typeof jobPostingSchema>;
export type JobInterviewResponse = z.infer<typeof jobInterviewResponse>;
