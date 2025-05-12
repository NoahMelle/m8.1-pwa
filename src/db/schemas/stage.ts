import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { performancesTable } from "./performance";

export const stagesTable = mysqlTable("stages_table", {
  id: int().primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  englishDescription: varchar("description", { length: 1024 }),
  dutchDescription: varchar("dutch_description", { length: 1024 }),
  xPosition: int("x_position").default(0).notNull(),
  yPosition: int("y_position").default(0).notNull(),
});

export const stageRelations = relations(stagesTable, ({ many }) => ({
  performances: many(performancesTable),
}));
