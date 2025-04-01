import { z } from "zod";

const headerSectionSchema = z.object({
   type: z.literal("header"),
   title: z.string(),
   description: z.string(),
});

const exampleSchema = z.object({
   number: z.string(),
   inputs: z.string(),
   output: z.string(),
});

const examplesSectionSchema = z.object({
   type: z.literal("examples"),
   examples: z.array(exampleSchema),
});

const constraintsSectionSchema = z.object({
   type: z.literal("constraints"),
   constraints: z.array(z.string()),
});

const additionalInfoSectionSchema = z.object({
   type: z.literal("additional_information"),
   description: z.string(),
});

const sectionSchema = z.union([
   headerSectionSchema,
   examplesSectionSchema,
   constraintsSectionSchema,
   additionalInfoSectionSchema,
]);

export const questionSchema = z.object({
   sections: z.array(sectionSchema),
});

export const jobInterview = z.object({
   id: z.string(),
   questions: z.array(questionSchema),
   jobPostId: z.string(),
   createdBy: z.string(),
   createdAt: z.date(),
   updatedAt: z.date(),
});

export type JobInterview = z.infer<typeof jobInterview>;
export type QuestionSchema = z.infer<typeof questionSchema>;
