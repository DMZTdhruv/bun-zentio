import type {
   GenerateLeetCodeQuestionsWithGeminiSchema,
   Message,
   UiMessagesSchema,
} from "../schema/ai";
import {
   createInterviewLeetCodeProblemsPrompt,
   createJobPostPrompt,
} from "../constant";
import { questionSchema, type QuestionSchema } from "../schema/leetcode";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToCoreMessages, generateObject, type UIMessage } from "ai";
import { jobPostingSchema } from "../schema/job";
import { streamText } from "ai";

const geminiApiKey = process.env.GEMINI_KEY;
if (!geminiApiKey) {
   throw new Error("gemini api key is not defined");
}

const genAi = createGoogleGenerativeAI({
   apiKey: geminiApiKey,
});

const jobPostingModel = genAi("gemini-2.0-flash-001");
const leetCodeModel = genAi("gemini-2.0-flash-001");
const chatModel = genAi("gemini-2.0-flash-001", {
   useSearchGrounding: true,
});

export class Gemini {
   static async generateJobPostDetails(prompt: string) {
      const { object } = await generateObject({
         model: jobPostingModel,
         prompt,
         schema: jobPostingSchema,
         system: createJobPostPrompt,
      });
      return object;
   }

   static async sendMessage(data: UiMessagesSchema) {
      const { messages } = data;
      const result = streamText({
         model: chatModel,
         messages: messages,
      });

      return result.toDataStreamResponse();
   }

   static async generateLeetCodeQuestions({
      position,
   }: GenerateLeetCodeQuestionsWithGeminiSchema): Promise<
      QuestionSchema | undefined
   > {
      console.log("\n\ngenerating LeetCode questions....");

      const prompt = `Generate 3 leet code question for the level ${position}.`;
      const { object } = await generateObject({
         model: leetCodeModel,
         prompt: prompt,
         schema: questionSchema,
         system: createInterviewLeetCodeProblemsPrompt,
      });
      console.log(object);
      return object;
   }
}
