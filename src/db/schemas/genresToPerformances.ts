import { relations } from "drizzle-orm";
import { foreignKey, int, mysqlTable } from "drizzle-orm/mysql-core";
import { performancesTable } from "./performance";
import { genresTable } from "./genre";

export const genresToPerformancesTable = mysqlTable(
  "genres_to_performances_table",
  {
    id: int().primaryKey().autoincrement(),

    genreId: int("genre_id").notNull(),
    performanceId: int("performance_id").notNull(),
  },
  (table) => [
    foreignKey({
      name: "genres_to_performances_genre_id",
      columns: [table.genreId],
      foreignColumns: [genresTable.id],
    }),
    foreignKey({
      name: "genres_to_performances_performance_id",
      columns: [table.performanceId],
      foreignColumns: [performancesTable.id],
    }),
  ]
);

export const genresToPerformancesRelations = relations(
  genresToPerformancesTable,
  ({ one }) => ({
    genre: one(genresTable, {
      fields: [genresToPerformancesTable.genreId],
      references: [genresTable.id],
    }),
    performance: one(performancesTable, {
      fields: [genresToPerformancesTable.performanceId],
      references: [performancesTable.id],
    }),
  })
);
