CREATE SCHEMA "interview_chat";
--> statement-breakpoint
CREATE SCHEMA "interview_messages";
--> statement-breakpoint
CREATE SCHEMA "interview_solution_feedback_schema";
--> statement-breakpoint
CREATE SCHEMA "interview_solution_schema";
--> statement-breakpoint
CREATE SCHEMA "interview_submission_feedback_schema";
--> statement-breakpoint
CREATE SCHEMA "interview_submission_report_schema";
--> statement-breakpoint
CREATE TYPE "interview_messages"."sender" AS ENUM('user', 'model', 'assistant');--> statement-breakpoint
CREATE TABLE "chat_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"sender_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"solutions" text[],
	"submitted_by" uuid NOT NULL,
	"job_interview_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"company" text NOT NULL,
	"job_type" text NOT NULL,
	"position" text NOT NULL,
	"location" text DEFAULT 'sf' NOT NULL,
	"public" boolean DEFAULT true NOT NULL,
	"title" text NOT NULL,
	"job_posting" jsonb NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_chat"."interview_chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	"interview_id" uuid NOT NULL,
	"created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_messages"."interview_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	"sender" "interview_messages"."sender" NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_interview" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_post_id" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_interview_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "additional_info_section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"type" varchar DEFAULT 'additional_information' NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "constraint" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"constraint_section_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "constraints_section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"type" varchar DEFAULT 'constraints' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "example" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"example_section_id" uuid NOT NULL,
	"number" varchar NOT NULL,
	"inputs" text NOT NULL,
	"output" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "examples_section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"type" varchar DEFAULT 'examples' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "header_section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_solution_feedback_schema"."interview_solution_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	"strengths" text NOT NULL,
	"weaknesses" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_solution_schema"."interview_solution" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	"solution" text NOT NULL,
	"problem_index" varchar(10),
	"problem_id" uuid NOT NULL,
	"interview_id" uuid NOT NULL,
	"submitted_by" uuid NOT NULL,
	"validation_score" integer NOT NULL,
	"quality_score" integer NOT NULL,
	"feedback" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_submission_feedback_schema"."interview_submission_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	"strengths" text NOT NULL,
	"weaknesses" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_submission_report_schema"."interview_submission_report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	"problems_solved_score" integer NOT NULL,
	"time_score" integer NOT NULL,
	"validation_score" integer NOT NULL,
	"quality_score" integer NOT NULL,
	"feedback" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(20) NOT NULL,
	"name" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_submission" ADD CONSTRAINT "interview_submission_submitted_by_users_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_submission" ADD CONSTRAINT "interview_submission_job_interview_id_job_interview_id_fk" FOREIGN KEY ("job_interview_id") REFERENCES "public"."job_interview"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_posts" ADD CONSTRAINT "job_posts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_chat"."interview_chat" ADD CONSTRAINT "interview_chat_interview_id_job_interview_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."job_interview"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_chat"."interview_chat" ADD CONSTRAINT "interview_chat_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_interview" ADD CONSTRAINT "job_interview_job_post_id_job_posts_id_fk" FOREIGN KEY ("job_post_id") REFERENCES "public"."job_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_interview" ADD CONSTRAINT "job_interview_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem" ADD CONSTRAINT "problem_job_interview_id_job_interview_id_fk" FOREIGN KEY ("job_interview_id") REFERENCES "public"."job_interview"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "additional_info_section" ADD CONSTRAINT "additional_info_section_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "constraint" ADD CONSTRAINT "constraint_constraint_section_id_constraints_section_id_fk" FOREIGN KEY ("constraint_section_id") REFERENCES "public"."constraints_section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "constraints_section" ADD CONSTRAINT "constraints_section_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "example" ADD CONSTRAINT "example_example_section_id_examples_section_id_fk" FOREIGN KEY ("example_section_id") REFERENCES "public"."examples_section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examples_section" ADD CONSTRAINT "examples_section_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_section" ADD CONSTRAINT "header_section_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_solution_schema"."interview_solution" ADD CONSTRAINT "interview_solution_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_solution_schema"."interview_solution" ADD CONSTRAINT "interview_solution_interview_id_job_interview_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."job_interview"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_solution_schema"."interview_solution" ADD CONSTRAINT "interview_solution_submitted_by_users_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_solution_schema"."interview_solution" ADD CONSTRAINT "interview_solution_feedback_interview_solution_feedback_id_fk" FOREIGN KEY ("feedback") REFERENCES "interview_solution_feedback_schema"."interview_solution_feedback"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_submission_report_schema"."interview_submission_report" ADD CONSTRAINT "interview_submission_report_feedback_interview_submission_feedback_id_fk" FOREIGN KEY ("feedback") REFERENCES "interview_submission_feedback_schema"."interview_submission_feedback"("id") ON DELETE cascade ON UPDATE no action;