import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { JobPost } from "./job.sql";
import { UserTable } from "./user.sql";

// done
export const Problem = pgTable("problem", {
   id: uuid("id").primaryKey().defaultRandom(),
   job_interview_id: uuid("job_interview_id")
      .notNull()
      .references(() => JobInterview.id, { onDelete: "cascade" }),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// done
export const headerSection = pgTable("header_section", {
   id: uuid("id").primaryKey().defaultRandom(),
   problem_id: uuid("problem_id")
      .notNull()
      .references(() => Problem.id, {
         onDelete: "cascade",
      }),
   title: text("title").notNull(),
   description: text("description").notNull(),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const examplesSection = pgTable("examples_section", {
   id: uuid("id").primaryKey().defaultRandom(),
   problem_id: uuid("problem_id")
      .notNull()
      .references(() => Problem.id, {
         onDelete: "cascade",
      }),
   type: varchar("type").notNull().default("examples"),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const example = pgTable("example", {
   id: uuid("id").primaryKey().defaultRandom(),
   example_section_id: uuid("example_section_id")
      .notNull()
      .references(() => examplesSection.id, { onDelete: "cascade" }),
   number: varchar("number").notNull(),
   inputs: text("inputs").notNull(),
   output: text("output").notNull(),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const constraintsSection = pgTable("constraints_section", {
   id: uuid("id").primaryKey().defaultRandom(),
   problem_id: uuid("problem_id").references(() => Problem.id, {
      onDelete: "cascade",
   }),
   type: varchar("type").notNull().default("constraints"),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const constraint = pgTable("constraint", {
   id: uuid("id").primaryKey().defaultRandom(),
   constraint_section_id: uuid("constraint_section_id").references(
      () => constraintsSection.id,
      { onDelete: "cascade" },
   ),
   content: text("content").notNull(), // like "2 <= nums.length <= 10^4"
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const additionalInfoSection = pgTable("additional_info_section", {
   id: uuid("id").primaryKey().defaultRandom(),
   problem_id: uuid("problem_id").references(() => Problem.id, {
      onDelete: "cascade",
   }),
   type: varchar("type").notNull().default("additional_information"),
   description: text("description").notNull(),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const JobInterview = pgTable("job_interview", {
   id: uuid("id").primaryKey().defaultRandom(),
   job_post_id: uuid("job_post_id")
      .notNull()
      .references(() => JobPost.id, { onDelete: "cascade" }),
   created_by: uuid("created_by")
      .notNull()
      .references(() => UserTable.id),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});
