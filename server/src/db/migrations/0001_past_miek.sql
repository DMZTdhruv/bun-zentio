ALTER TABLE "problem" ALTER COLUMN "job_interview_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "example" ALTER COLUMN "example_section_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "examples_section" ALTER COLUMN "problem_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "header_section" ALTER COLUMN "problem_id" SET NOT NULL;