import { integer, pgSchema, text, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "./base.sql";
import { JobInterview, Problem } from "./question.sql";
import { UserTable } from "./user.sql";
import { JobPost } from "./job.sql";

export const interviewSolutionSchema = pgSchema("interview_solution_schema");
export const interviewSolutionReport = pgSchema(
   "interview_solution_feedback_schema",
);
export const interviewSubmissionReport = pgSchema(
   "interview_submission_report_schema",
);
export const interviewSubmissionFeedback = pgSchema(
   "interview_submission_feedback_schema",
);

export const interviewSolutionFeedbackTable = interviewSolutionReport.table(
   "interview_solution_feedback",
   {
      ...baseColumns(),
      strengths: text().notNull(),
      weaknesses: text().notNull(),
   },
);

export const interviewSolutionTable = interviewSolutionSchema.table(
   "interview_solution",
   {
      ...baseColumns(),
      solution: text().notNull(),
      problem_index: varchar({ length: 10 }),
      problem_id: uuid()
         .references(() => Problem.id, { onDelete: "cascade" })
         .notNull(),
      interview_id: uuid()
         .references(() => JobInterview.id, { onDelete: "cascade" })
         .notNull(),
      submitted_by: uuid()
         .references(() => UserTable.id, { onDelete: "cascade" })
         .notNull(),
      validation_score: integer().notNull(),
      quality_score: integer().notNull(),
      feedback: uuid()
         .references(() => interviewSolutionFeedbackTable.id, {
            onDelete: "cascade",
         })
         .notNull(),
   },
);

export const interviewSubmissionFeedbackTable =
   interviewSubmissionFeedback.table("interview_submission_feedback", {
      ...baseColumns(),
      strengths: text().notNull(),
      weaknesses: text().notNull(),
   });

export const interviewSubmissionReportTable = interviewSubmissionReport.table(
   "interview_submission_report",
   {
      ...baseColumns(),
      problems_solved_score: integer().notNull(),
      time_score: integer().notNull(),
      validation_score: integer().notNull(),
      quality_score: integer().notNull(),
      job_post_id: uuid()
         .references(() => JobPost.id, { onDelete: "cascade" })
         .notNull(),
      created_by: uuid()
         .references(() => UserTable.id, {
            onDelete: "cascade",
         })
         .notNull(),
      feedback: uuid()
         .references(() => interviewSubmissionFeedbackTable.id, {
            onDelete: "cascade",
         })
         .notNull(),
   },
);
