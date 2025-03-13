ALTER TABLE "interview_job_posts" RENAME TO "job_posts";--> statement-breakpoint
ALTER TABLE "job_posts" DROP CONSTRAINT "interview_job_posts_created_by_users_username_fk";
--> statement-breakpoint
ALTER TABLE "job_posts" ADD CONSTRAINT "job_posts_created_by_users_username_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("username") ON DELETE cascade ON UPDATE no action;