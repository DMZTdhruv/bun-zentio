import { timestamp, uuid } from "drizzle-orm/pg-core";

export const baseColumns = () => ({
   id: uuid("id").primaryKey().defaultRandom(),
   created_at: timestamp({ mode: "date", withTimezone: true }).defaultNow(),
   updated_at: timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date()),
   deleted_at: timestamp({ mode: "date", withTimezone: true }),
});
