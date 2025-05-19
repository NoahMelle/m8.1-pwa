import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { genresToPerformancesTable } from "./genresToPerformances";

export const genresTable = mysqlTable("genres_table", {
  id: int().primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const genreRelations = relations(genresTable, ({ many }) => ({
  acts: many(genresToPerformancesTable),
}));
