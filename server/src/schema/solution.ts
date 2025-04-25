import { z } from "zod";

export const submitCodeSolutionSchema = z.object({
   solution: z.string(),
   problemIndex: z.string(),
   problemId: z.string(),
   interviewId: z.string(),
});

export const aiCodeSolutionReportSchema = z.object({
   validation_score: z.number().int().min(0).max(5),
   quality_score: z.number().int().min(0).max(5),
   feedback: z.object({
      strengths: z.string(),
      weaknesses: z.string(),
   }),
});

export const submitInterviewResultSchema = z.object({
   timeScore: z.string(),
   problemsSolvedScore: z.string(),
   jobPostId: z.string(),
});

export const getInterviewReportQuerySchema = z.object({
   jobPostId: z.string(),
});

export type SubmitInterviewResultSchema = z.infer<
   typeof submitInterviewResultSchema
>;

export type GetInterviewReportQuerySchema = z.infer<
   typeof getInterviewReportQuerySchema
>;

export type AiCodeSolutionReportSchema = z.infer<
   typeof aiCodeSolutionReportSchema
>;

export type SubmitCodeSolutionSchema = z.infer<typeof submitCodeSolutionSchema>;
