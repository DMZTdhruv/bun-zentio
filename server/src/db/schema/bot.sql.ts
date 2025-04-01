import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user.sql";

export const ChatMessage = pgTable("chat_message", {
   id: uuid("id").primaryKey().defaultRandom(),
   role: text("role", { enum: ["user", "assistant"] }).notNull(),
   content: text("content").notNull(),
   created_at: timestamp("created_at").defaultNow().notNull(),
   updated_at: timestamp("updated_at").defaultNow().notNull(),
   sender_id: uuid("sender_id")
      .notNull()
      .references(() => UserTable.id, {
         onDelete: "cascade",
      }),
});
