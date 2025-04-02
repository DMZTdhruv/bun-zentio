import { z } from "zod";

const jobPostSchema = z.object({
   id: z.string(),
   description: z.string(),
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
   public: z.boolean(),
   title: z.string(),
   job_posting: z.object({
      type: z.string(),
      level: z.string(),
      title: z.string(),
      company: z.object({
         name: z.string(),
         salary: z.string(),
         location: z.string(), // Match your data structure
      }),
      benefits: z.array(z.string()),
      description: z.string(),
      requirements: z.array(z.string()),
      responsibilities: z.array(z.string()),
   }),
   created_by: z.string(),
   created_at: z.date(),
   updated_at: z.date(),
});

const jobInterviewDetailsSchema = z.object({
   id: z.string(),
   job_post_id: z.string(),
   created_by: z.string(),
   created_at: z.date(), // Changed from z.string()
   updated_at: z.date(), // Changed from z.string()
});
// Header Section Schema
const headerSectionSchema = z.object({
   id: z.string(),
   problem_id: z.string(),
   title: z.string(),
   description: z.string(),
   created_at: z.date(), // Changed from z.string()
   updated_at: z.date(), // Changed from z.string()
});
// Example Schema
const exampleSchema = z.object({
   id: z.string(),
   example_section_id: z.string(),
   number: z.string(),
   inputs: z.string(),
   output: z.string(),
   created_at: z.date(), // Changed from z.string()
   updated_at: z.date(), // Changed from z.string()
});
// Examples Section Schema
const examplesSectionSchema = z.object({
   id: z.string(),
   problem_id: z.string(),
   type: z.literal("examples"),
   created_at: z.date(), // Changed from z.string()
   updated_at: z.date(), // Changed from z.string()
   examples: z.array(exampleSchema),
});
// Constraint Schema
const constraintSchema = z.object({
   id: z.string(),
   constraint_section_id: z.string(),
   content: z.string(),
   created_at: z.date(), // Changed from z.string()
   updated_at: z.date(), // Changed from z.string()
});
// Constraints Section Schema
// Note: In some data it's "constraints" and in others it's "constrains"
const constraintsSectionSchema = z.object({
   id: z.string(),
   problem_id: z.string(),
   type: z.literal("constraints"),
   created_at: z.date(), // Changed from z.string()
   updated_at: z.date(), // Changed from z.string()
   constraints: z.array(constraintSchema), // Make sure this is consistent with your code
});
// Additional Info Section Schema
const additionalInfoSectionSchema = z.object({
   id: z.string(),
   problem_id: z.string(),
   type: z.literal("additional_information"),
   description: z.string(),
   created_at: z.date(),
   updated_at: z.date(),
});
// Problem Sections Schema
const problemSectionsSchema = z.object({
   headerSection: headerSectionSchema,
   examplesSection: examplesSectionSchema,
   constraintsSection: constraintsSectionSchema,
   additionalInfoSection: additionalInfoSectionSchema,
});
// Problem Details Schema
const problemDetailsSchema = z.object({
   id: z.string(),
   job_interview_id: z.string(),
   created_at: z.date(),
   updated_at: z.date(),
   sections: problemSectionsSchema,
});
// Problems Schema
const problemsSchema = z.object({
   type: z.literal("problems"),
   problemDetails: z.array(problemDetailsSchema),
});
// Job Post Type
const jobPostType = z.object({
   type: z.literal("jobPost"),
   jobDetails: jobPostSchema,
});
// Job Interview Type
const jobInterviewType = z.object({
   type: z.literal("jobInterview"),
   jobInterviewDetails: jobInterviewDetailsSchema,
});
// Root Schema: Array of different types
const rootSchema = z.array(
   z.union([jobPostType, jobInterviewType, problemsSchema]),
);

export const jobItem = z.union([jobPostType, jobInterviewType]);
export const topPart = z.array(jobItem);
export type JobPost = z.infer<typeof jobPostSchema>;
export type JobInterviewDetails = z.infer<typeof jobInterviewDetailsSchema>;
export type ProblemDetails = z.infer<typeof problemDetailsSchema>;
export type JobInterviewRootSchema = z.infer<typeof rootSchema>;
