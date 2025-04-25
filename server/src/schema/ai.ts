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

const uIMessageSchema = z.object({
   id: z.string(),
   messages: z.array(
      z.object({
         role: z.enum(["user", "assistant", "system"]),
         content: z.string(),
         parts: z.array(
            z.object({
               type: z.string(),
               text: z.string(),
            }),
         ),
      }),
   ),
});

export const uiMessagesSchema = z.object({
   messages: z.array(z.any()),
   system: z.string().optional(),
});

export const copilotSchema = z.object({
   prompt: z.string(),
   system: z.string(),
});

export type UiMessagesSchema = z.infer<typeof uIMessageSchema>;
export type CopilotSchema = z.infer<typeof copilotSchema>;
export const messagesSchema = z.array(messageSchema);

export type GenerateLeetCodeQuestionsWithGeminiSchema = z.infer<
   typeof generateLeetCodeQuestionsWithGeminiSchema
>;

export type Message = z.infer<typeof messageSchema>;
