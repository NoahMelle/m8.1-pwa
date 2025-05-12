import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { stagesTable } from "./stage";

export const performancesTable = mysqlTable("performances_table", {
  id: int().primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  stageId: int("stage_id")
    .notNull()
    .references(() => stagesTable.id, {
      onDelete: "cascade",
    }),
});

export const performanceRelations = relations(performancesTable, ({ one }) => ({
  stage: one(stagesTable, {
    fields: [performancesTable.stageId],
    references: [stagesTable.id],
  }),
}));
