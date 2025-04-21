import { pgSchema, text, uuid } from "drizzle-orm/pg-core";
import { baseColumns } from "./base.sql";
import { JobInterview } from "./question.sql";
import { UserTable } from "./user.sql";

export const interviewChatTableSchema = pgSchema("interview_chat");
export const interviewMessagesTableSchema = pgSchema("interview_messages");
export enum SenderTypeEnum {
   user = "user",
   model = "model",
   assistant = "assistant",
}

export const messageSenderTypeEnum = interviewMessagesTableSchema.enum(
   "sender",
   [SenderTypeEnum.user, SenderTypeEnum.model, SenderTypeEnum.assistant],
);

export const interviewChatTable = interviewChatTableSchema.table(
   "interview_chat",
   {
      ...baseColumns(),
      interviewId: uuid()
         .references(() => JobInterview.id)
         .notNull(),
      createdBy: uuid()
         .references(() => UserTable.id)
         .notNull(),
   },
);

export const interviewMessagesTable = interviewMessagesTableSchema.table(
   "interview_messages",
   {
      ...baseColumns(),
      sender: messageSenderTypeEnum().notNull(),
      content: text().notNull(),
   },
);
