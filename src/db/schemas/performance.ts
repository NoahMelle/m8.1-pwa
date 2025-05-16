import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { stagesTable } from "./stage";
import { genresToPerformancesTable } from "./genresToPerformances";

export const performancesTable = mysqlTable("performances_table", {
  id: int().primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),

  videoUrl: varchar("video_url", { length: 512 }),
  imageUrl: varchar("image_url", { length: 512 }),

  englishDescription: varchar("description", { length: 1024 }),
  dutchDescription: varchar("dutch_description", { length: 1024 }),

  stageId: int("stage_id")
    .notNull()
    .references(() => stagesTable.id, {
      onDelete: "cascade",
    }),
});

export const performanceRelations = relations(
  performancesTable,
  ({ one, many }) => ({
    stage: one(stagesTable, {
      fields: [performancesTable.stageId],
      references: [stagesTable.id],
    }),

    genres: many(genresToPerformancesTable),
  })
);
