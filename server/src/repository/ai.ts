import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateLeetCodeQuestionsWithGeminiSchema } from "../schema/ai";

const geminiApiKey = process.env.GEMINI_KEY;
if (!geminiApiKey) {
   throw new Error("gemini api key is not defined");
}
const genAi = new GoogleGenerativeAI(geminiApiKey);
const model = genAi.getGenerativeModel({
   model: "gemini-2.0-flash",
   systemInstruction: `
I want you to generate a job posting based on the following structured inputs:

- **Title:** [Job title]  
- **Description:** [What the job does]  
- **Type of job:** [Frontend, Backend, Web3, etc.]  
- **Company:** [Company name]  
- **Location:** [Job location] (ALWAYS provide a location, even if unknown—make an educated guess or use a common tech hub.)  
- **Level:** [Junior, Mid, Senior]  
- **Salary:** [Expected salary range]  

### **Guidelines:**  
- The job posting should be **clear, engaging, and well-structured**.  
- Return the output **strictly in JSON format** following this exact structure:  

\`\`\`json
{
  "title": "Job Title",
  "description": "Brief description of what the job entails.",
  "type": "Frontend / Backend / Web3 / etc.",
  "company": {
    "name": "Company Name",
    "location": "City, Country (ALWAYS include a location, never leave it empty or 'none')",
    "salary": "$120k - $130k"
  },
  "level": "Junior / Mid / Senior",
  "responsibilities": [
    "Responsibility 1",
    "Responsibility 2",
    "Responsibility 3"
  ],
  "requirements": [
    "Requirement 1",
    "Requirement 2",
    "Requirement 3"
  ],
  "benefits": [
    "Benefit 1",
    "Benefit 2",
    "Benefit 3"
  ]
}
\`\`\`

DO NOT include a section for "How to Apply."

Adapt the tone based on the level (e.g., simpler for junior roles, more advanced for senior roles).
`,
});

const jobInterviewQuestionPrompt = `Generate 4 LeetCode-style questions based on the difficulty levels I provide. The difficulty levels are based on candidate position: junior, mid, and senior. The output should be a JSON array where each element is a Markdown-formatted string containing the problem statement. here is the payload`;

export namespace AiRepo {
   export const generateWithGemini = async (prompt: string) => {
      console.log("\n\ngenerating output....");
      const result = await model.generateContent(prompt);
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

   export const generateLeetCodeQuestionsWithGemini = async ({
      position,
      job_type,
   }: GenerateLeetCodeQuestionsWithGeminiSchema): Promise<
      string[] | undefined
   > => {
      console.log("\n\ngenerating output....");
      const result = await model.generateContent(
         `${jobInterviewQuestionPrompt} position: ${position}, job_type: ${job_type} `,
      );
      const jsonMatch = result.response
         .text()
         .match(/```json\s*([\s\S]*?)\s*```/);
      if (!jsonMatch) {
         throw new Error("Failed to extract JSON from response");
      }

      const jsonData = JSON.parse(jsonMatch[1]);
      return jsonData;
   };
}
