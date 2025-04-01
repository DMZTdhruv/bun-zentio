import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
   id: uuid("id").primaryKey().defaultRandom(),
   username: varchar("username", { length: 20 }).notNull().unique(),
   name: varchar("name", { length: 20 }).notNull(),
   email: varchar("email", { length: 255 }).notNull().unique(),
   password_hash: text("password_hash").notNull(),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
});
