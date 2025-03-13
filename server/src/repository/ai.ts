import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_KEY;
if (!geminiApiKey) {
   throw new Error("gemini api key is not defined");
}
const genAi = new GoogleGenerativeAI(geminiApiKey);
const model = genAi.getGenerativeModel({
   model: "gemini-2.0-flash",
   systemInstruction: `
I want you to generate a job posting based on the following structured inputs:

Title: [Job title]
Description: [What the job does]
Type of job: [Frontend, Backend, Web3, etc.]
Company: [Company name]
Location: [Job location]
Level: [Junior, Mid, Senior]

Guidelines:

The job posting should be clear, engaging, and well-structured.
Return the output strictly in JSON format following this structure:

json
CopyEdit
{
"title": "Job Title",
"description": "Brief description of what the job entails.",
"type": "Frontend / Backend / Web3 / etc.",
"company": {
"name": "Company Name",
"location": "Company Location"
},
"level": "Junior / Mid / Senior",
"Responsibility 1",
"Responsibility 2",
"Responsibility 3"
],
"requirements": [
"Requirement 1",
"Requirement 3"
],
"benefits": [
"Benefit 1",
"Benefit 2",
"Benefit 3"
]}

DO NOT include a section for "How to Apply."

Adapt the tone based on the level (e.g., simpler for junior roles, more advanced for senior roles).
`,
});

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
}
