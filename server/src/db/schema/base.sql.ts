import { timestamp, uuid } from "drizzle-orm/pg-core";

export const baseColumns = () => ({
   id: uuid("id").primaryKey().defaultRandom(),
   createdAt: timestamp({ mode: "date", withTimezone: true }).defaultNow(),
   updatedAt: timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date()),
   deletedAt: timestamp({ mode: "date", withTimezone: true }),
});
