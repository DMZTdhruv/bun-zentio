import { z } from "zod";

export const generateLeetCodeQuestionsWithGeminiSchema = z.object({
   // job_type: z.enum([
   //    "frontend",
   //    "backend",
   //    "fullstack",
   //    "mobile",
   //    "devops",
   //    "machine learning",
   //    "cyber security",
   // ]),
   position: z.enum(["senior", "mid", "junior"]),
});

export type GenerateLeetCodeQuestionsWithGeminiSchema = z.infer<
   typeof generateLeetCodeQuestionsWithGeminiSchema
>;
