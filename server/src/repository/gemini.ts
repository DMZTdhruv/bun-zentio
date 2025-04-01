import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateLeetCodeQuestionsWithGeminiSchema } from "../schema/ai";
import {
   createInterviewLeetCodeProblemsPrompt,
   createJobPostPrompt,
} from "../constant";
import { z } from "zod";
import { questionSchema, type QuestionSchema } from "../schema/question";

const geminiApiKey = process.env.GEMINI_KEY;
if (!geminiApiKey) {
   throw new Error("gemini api key is not defined");
}

const genAi = new GoogleGenerativeAI(geminiApiKey);

const jobPostingModel = genAi.getGenerativeModel({
   model: "gemini-2.0-flash",
   systemInstruction: createJobPostPrompt,
});

const leetCodeModel = genAi.getGenerativeModel({
   model: "gemini-2.0-flash",
   systemInstruction: createInterviewLeetCodeProblemsPrompt,
});

export namespace Gemini {
   export const generateJobPostDetails = async (prompt: string) => {
      const result = await jobPostingModel.generateContent(prompt);
      const jsonMatch = result.response
         .text()
         .match(/```json\s*([\s\S]*?)\s*```/);
      if (!jsonMatch) {
         throw new Error("Failed to extract JSON from response");
      }
      const jsonData = JSON.parse(jsonMatch[1]);
      console.log(jsonData);
      return jsonData;
   };

   export const generateLeetCodeQuestions = async ({
      position,
      job_type,
   }: GenerateLeetCodeQuestionsWithGeminiSchema): Promise<
      QuestionSchema[] | undefined
   > => {
      console.log("\n\ngenerating LeetCode questions....");
      const prompt = `Generate 3 questions for a ${position} level ${job_type} developer position.`;

      const result = await leetCodeModel.generateContent(prompt);
      const jsonMatch = result.response
         .text()
         .match(/```json\s*([\s\S]*?)\s*```/);

      if (!jsonMatch) {
         throw new Error("Failed to extract JSON from response");
      }

      const jsonData = JSON.parse(jsonMatch[1]);
      const validatedData = z.array(questionSchema).parse(jsonData);

      return validatedData;
   };
}
