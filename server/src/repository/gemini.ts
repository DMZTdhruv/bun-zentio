import type {
   CopilotSchema,
   GenerateLeetCodeQuestionsWithGeminiSchema,
   UiMessagesSchema,
} from "../schema/ai";
import {
   aiCodeReviewerPrompt,
   createInterviewLeetCodeProblemsPrompt,
   createJobPostPrompt,
} from "../constant";
import { questionSchema, type QuestionSchema } from "../schema/leetcode";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { jobPostingSchema } from "../schema/job";
import { streamText } from "ai";
import {
   aiCodeSolutionReportSchema,
   type SubmitCodeSolutionSchema,
} from "../schema/solution";
import { ZentioError } from "../utils/utils";
import { z } from "zod";

const geminiApiKey = process.env.GEMINI_KEY;
if (!geminiApiKey) {
   throw new Error("gemini api key is not defined");
}

const genAi = createGoogleGenerativeAI({
   apiKey: geminiApiKey,
});

const jobPostingModel = genAi("gemini-2.0-flash-001");
const codeReviewModel = genAi("gemini-2.0-flash-001");
const leetCodeModel = genAi("gemini-2.0-flash-001");
const chatModel = genAi("gemini-2.0-flash-001", {
   useSearchGrounding: true,
});
const copilotModel = genAi("gemini-2.0-flash-001");

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

   static async copilot({ prompt, system }: CopilotSchema) {
      const result = await generateText({
         maxTokens: 200,
         model: copilotModel,
         prompt,
         system,
         temperature: 0.7,
      });

      return result;
   }

   static async generateCodeSolutionReport(
      data: SubmitCodeSolutionSchema,
      problemStatement: string,
   ) {
      try {
         const prompt = {
            problemStatement,
            codeSolution: data.solution,
         };

         const { object } = await generateObject({
            model: codeReviewModel,
            prompt: JSON.stringify(prompt),
            schema: aiCodeSolutionReportSchema,
            system: aiCodeReviewerPrompt,
         });

         return object;
      } catch (error) {
         console.log(error);
         throw new ZentioError("failed to proceed report with ai", 422);
      }
   }

   static async generateStrengthAndWeakness(prompt: string) {
      const { object } = await generateObject({
         model: codeReviewModel,
         prompt,
         schema: z.object({
            strengths: z.string(),
            weakness: z.string(),
         }),
         system: `You are an assistant who specializes in summarizing feedback. Your job is to read arrays of strengths and weaknesses and then return a concise, professional summary. Group similar ideas, eliminate repetition, and present the final output in two clearly labeled sections: "Strengths" and "Weaknesses"`,
      });

      return object;
   }

   static async generateLeetCodeQuestions({
      position,
   }: GenerateLeetCodeQuestionsWithGeminiSchema): Promise<
      QuestionSchema | undefined
   > {
      console.log("\n\ngenerating LeetCode questions....");

      // use old prompt later after demo submission/production
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
