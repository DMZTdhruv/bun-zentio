ALTER TABLE "interviews" DROP CONSTRAINT "interviews_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "interviews" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "interviews" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_created_by_users_username_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("username") ON DELETE cascade ON UPDATE no action;