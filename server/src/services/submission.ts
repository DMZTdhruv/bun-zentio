import { and, eq } from "drizzle-orm";
import { db } from "../db";
import {
   constraint,
   constraintsSection,
   example,
   examplesSection,
   headerSection,
   JobInterview,
} from "../db/schema/question.sql";
import { ZentioError } from "../utils/utils";
import {
   interviewSolutionFeedbackTable,
   interviewSolutionTable,
   interviewSubmissionFeedbackTable,
   interviewSubmissionReportTable,
} from "../db/schema/report.sql";
import type { GetInterviewReportQuerySchema } from "../schema/solution";

export class SubmissionService {
   static async generateCodeReport(problemId: string) {
      try {
         const problemDescriptionPromise = db
            .select({
               description: headerSection.description,
            })
            .from(headerSection)
            .where(eq(headerSection.problem_id, problemId));

         const examplesPromise = db
            .select({
               example_section_id: examplesSection.id,
               example_id: example.id,
               exampleInput: example.inputs,
               exampleOutput: example.output,
            })
            .from(examplesSection)
            .leftJoin(
               example,
               eq(examplesSection.id, example.example_section_id),
            )
            .where(eq(examplesSection.problem_id, problemId));

         const constraintsPromise = db
            .select({
               constraint_id: constraint.id,
               constraint_section_id: constraintsSection.id,
               constraint_content: constraint.content,
            })
            .from(constraintsSection)
            .leftJoin(
               constraint,
               eq(constraintsSection.id, constraint.constraint_section_id),
            )
            .where(eq(constraintsSection.problem_id, problemId));

         const [[problemDescription], examples, constraints] =
            await Promise.all([
               problemDescriptionPromise,
               examplesPromise,
               constraintsPromise,
            ]);

         const problemStatement = JSON.stringify(
            [problemDescription, examples, constraints],
            null,
            2,
         );

         return problemStatement;
      } catch (error) {
         console.log(error);
         throw new ZentioError("failed to fetch the required details", 404);
      }
   }

   public static async getInterviewProblemSolutionReport(
      userId: string,
      jobPostId: string,
   ) {
      try {
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

         return data;
      } catch (error) {
         console.log(error);
         throw new ZentioError("failed to fetch the required details", 404);
      }
   }

   public static async getInterviewReport(
      userId: string,
      data: GetInterviewReportQuerySchema,
   ) {
      const response = (
         await db
            .select()
            .from(interviewSubmissionReportTable)
            .leftJoin(
               interviewSubmissionFeedbackTable,
               eq(
                  interviewSubmissionFeedbackTable.id,
                  interviewSubmissionReportTable.feedback,
               ),
            )
            .where(
               and(
                  eq(
                     interviewSubmissionReportTable.job_post_id,
                     data.jobPostId,
                  ),
                  eq(interviewSubmissionReportTable.created_by, userId),
               ),
            )
      )[0];

      console.log(response);

      return response;
   }
}
