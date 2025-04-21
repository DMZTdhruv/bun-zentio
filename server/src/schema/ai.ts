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

export const messageSchema = z.object({
   sender: z.enum(["assistant", "instruction", "user"]),
   content: z.string(),
});

export type GenerateLeetCodeQuestionsWithGeminiSchema = z.infer<
   typeof generateLeetCodeQuestionsWithGeminiSchema
>;

export type Message = z.infer<typeof messageSchema>;
