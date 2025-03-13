ALTER TABLE "interviews" RENAME TO "interview_job_posts";--> statement-breakpoint
ALTER TABLE "interview_job_posts" DROP CONSTRAINT "interviews_created_by_users_username_fk";
--> statement-breakpoint
ALTER TABLE "interview_job_posts" ALTER COLUMN "created_by" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "interview_job_posts" ADD CONSTRAINT "interview_job_posts_created_by_users_username_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("username") ON DELETE cascade ON UPDATE no action;