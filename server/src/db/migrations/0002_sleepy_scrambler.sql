ALTER TABLE "job_posts" ALTER COLUMN "location" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "additional_info_section" ALTER COLUMN "problem_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "constraint" ALTER COLUMN "constraint_section_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "constraints_section" ALTER COLUMN "problem_id" SET NOT NULL;