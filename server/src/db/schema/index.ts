import {
   jsonb,
   pgTable,
   text,
   boolean,
   timestamp,
   uuid,
   varchar,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
   id: uuid("id").primaryKey().defaultRandom(),
   username: varchar("username", { length: 20 }).notNull().unique(),
   name: varchar("name", { length: 20 }).notNull(),
   email: varchar("email", { length: 255 }).notNull().unique(),
   password_hash: text("password_hash").notNull(),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const JobPost = pgTable("job_posts", {
   // what we want from user
   id: uuid("id").primaryKey().defaultRandom(),
   description: text("description").notNull(),
   company: text("company").notNull(),
   job_type: text("job_type", { enum: ["frontend", "backend"] }).notNull(),
   position: text("position", { enum: ["senior", "mid", "junior"] }).notNull(),
   location: text("location").default("sf"),
   public: boolean("public").notNull().default(true),

   // what we want from ai
   title: text("title").notNull(),
   job_posting: jsonb("job_posting").notNull(),
   created_by: varchar("created_by")
      .notNull()
      .references(() => UserTable.username, { onDelete: "cascade" }),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});
