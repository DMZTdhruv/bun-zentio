import { db } from "../db";
import {
   interviewSolutionTable,
   interviewSubmissionFeedbackTable,
   interviewSubmissionReportTable,
} from "../db/schema/report.sql";
import { Gemini } from "../repository/gemini";
import { SubmissionRepo } from "../repository/submission";
import type { CopilotSchema, UiMessagesSchema } from "../schema/ai";
import type {
   SubmitCodeSolutionSchema,
   SubmitInterviewResultSchema,
} from "../schema/solution";
import { SubmissionService } from "./submission";

export class Ai {
   public static sendMessage(message: UiMessagesSchema) {
      return Gemini.sendMessage(message);
   }

   public static copilotGenerate(data: CopilotSchema) {
      return Gemini.copilot(data);
   }

   public static async generateProblemReport(
      userId: string,
      data: SubmitCodeSolutionSchema,
   ) {
      const problemStatement = await SubmissionService.generateCodeReport(
         data.problemId,
      );

      const result = await Gemini.generateCodeSolutionReport(
         data,
         problemStatement,
      );

      await SubmissionRepo.createReport(userId, data, result);
      return "report generated successfully";
   }

   public static async generateInterviewReport(
      userId: string,
      data: SubmitInterviewResultSchema,
   ) {
      const problemReportData =
         await SubmissionService.getInterviewProblemSolutionReport(
            userId,
            data.jobPostId,
         );

      const reports = problemReportData;

      let totalQualityScore = 0;
      let totalValidationScore = 0;
      let count = 0;

      const strengthsList: string[] = [];
      const weaknessesList: string[] = [];

      for (const item of reports) {
         const { report, feedback } = item;

         if (report) {
            totalQualityScore += report.quality_score ?? 0;
            totalValidationScore += report.validation_score ?? 0;
            count += 1;
         }

         if (feedback) {
            if (feedback.strengths) strengthsList.push(feedback.strengths);
            if (feedback.weaknesses) weaknessesList.push(feedback.weaknesses);
         }
      }

      const avgQualityScore = count ? Math.round(totalQualityScore / count) : 0;
      const avgValidationScore = count
         ? Math.round(totalValidationScore / count)
         : 0;
      const timeScore = getTimeScore(data.timeScore);
      const problemSolved = getProblemSolvedScore(
         problemReportData.length,
         Number(data.problemsSolvedScore),
      );

      const prompt = `
I have two arrays: one contains multiple strengths, and the other contains multiple weaknesses. Please carefully read through all of them and give me a concise and meaningful summary of both. Group similar points, remove redundancy, and highlight the most important ideas clearly.

Use a professional tone.

Structure it in two sections:
Strengths:
${JSON.stringify(strengthsList)}
Weaknesses:
${JSON.stringify(weaknessesList)}
`;

      const feedbackData = await Gemini.generateStrengthAndWeakness(prompt);
      const feedback = (
         await db
            .insert(interviewSubmissionFeedbackTable)
            .values({
               strengths: feedbackData.strengths,
               weaknesses: feedbackData.weakness,
            })
            .returning()
      )[0];

      console.log(feedback);

      const response = (
         await db
            .insert(interviewSubmissionReportTable)
            .values({
               problems_solved_score: problemSolved,
               quality_score: avgQualityScore,
               validation_score: avgValidationScore,
               time_score: timeScore,
               feedback: feedback.id,
               created_by: userId,
               job_post_id: data.jobPostId,
            })
            .returning()
      )[0];
      console.log(response);
      return response.job_post_id;
   }
}

function getTimeScore(timeStr: string): number {
   const [minutes, seconds] = timeStr.split(":").map(Number);
   const totalMinutes = minutes + seconds / 60;

   if (totalMinutes <= 38) return 5;
   if (totalMinutes >= 46) return 0;
   if (Math.floor(totalMinutes) === 45) return 1;
   if (Math.floor(totalMinutes) === 43) return 2;

   const scaled = ((45 - totalMinutes) / (45 - 38)) * (5 - 1) + 1;
   return Math.round(scaled); // ⬅️ guarantees integer
}

function getProblemSolvedScore(total: number, solved: number): number {
   if (total <= 0) return 0; // protect against invalid input

   const ratio = solved / total;
   const score = Math.round(ratio * 5);

   return score; // ⬅️ will always be 0 to 5 integer
}
