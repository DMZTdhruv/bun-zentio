import {
  jsonb,
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { UserTable } from "./user.sql";
import { JobInterview } from "./question.sql";
import { varchar } from "drizzle-orm/mysql-core";

export const JobPost = pgTable("job_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  job_type: text("job_type", {
    enum: [
      "frontend",
      "backend",
      "fullstack",
      "mobile",
      "devops",
      "machine learning",
      "cyber security",
    ],
  }).notNull(),
  position: text("position", { enum: ["senior", "mid", "junior"] }).notNull(),
  location: text("location").notNull().default("sf"),
  public: boolean("public").notNull().default(true),

  // what we want from ai
  title: text("title").notNull(),
  job_posting: jsonb("job_posting").notNull(),
  created_by: uuid("created_by")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const InterviewSubmission = pgTable("interview_submission", {
  id: uuid("id").primaryKey().defaultRandom(),
  solutions: text("solutions").array(),
  submitted_by: uuid("submitted_by")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  job_interview_id: uuid("job_interview_id")
    .notNull()
    .references(() => JobInterview.id, { onDelete: "cascade" }),
});
