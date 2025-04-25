import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { JobInterview } from "../db/schema/question.sql";
import {
   interviewSolutionFeedbackTable,
   interviewSolutionTable,
} from "../db/schema/report.sql";
import type {
   AiCodeSolutionReportSchema,
   SubmitCodeSolutionSchema,
} from "../schema/solution";

export class SubmissionRepo {
   static async createReport(
      userId: string,
      data: SubmitCodeSolutionSchema,
      result: AiCodeSolutionReportSchema,
   ) {
      const feedback = (
         await db
            .insert(interviewSolutionFeedbackTable)
            .values({
               strengths: result.feedback.strengths,
               weaknesses: result.feedback.weaknesses,
            })
            .returning()
      )[0];

      const response = (
         await db
            .insert(interviewSolutionTable)
            .values({
               solution: data.solution,
               problem_index: data.problemIndex,
               problem_id: data.problemId,
               interview_id: data.interviewId,
               submitted_by: userId,
               validation_score: result.validation_score,
               quality_score: result.quality_score,
               feedback: feedback.id,
            })
            .returning()
      )[0];

      console.log(feedback, response);
   }

   static async createInterviewReport(userId: string, jobPostId: string) {
      const data = await db
         .select({
            report: interviewSolutionTable,
            feedback: interviewSolutionFeedbackTable,
         })
         .from(JobInterview)
         .leftJoin(
            interviewSolutionTable,
            and(
               eq(interviewSolutionTable.interview_id, JobInterview.id),
               eq(interviewSolutionTable.submitted_by, userId),
            ),
         )
         .leftJoin(
            interviewSolutionFeedbackTable,
            eq(
               interviewSolutionFeedbackTable.id,
               interviewSolutionTable.feedback,
            ),
         )
         .where(eq(JobInterview.job_post_id, jobPostId));

      const reports = data;

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

      const avgQualityScore = count ? totalQualityScore / count : 0;
      const avgValidationScore = count ? totalValidationScore / count : 0;

      console.log("Average Quality Score:", avgQualityScore);
      console.log("Average Validation Score:", avgValidationScore);
      console.log("Strengths:", strengthsList);
      console.log("Weaknesses:", weaknessesList);
   }
}
