import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const articlesTable = mysqlTable("articles_table", {
  id: int().primaryKey().autoincrement(),

  englishTitle: varchar("english_title", { length: 255 }).notNull(),
  dutchTitle: varchar("dutch_title", { length: 255 }).notNull(),

  englishContent: text("english_content"),
  dutchContent: text("dutch_content"),

  image: varchar({ length: 255 }),
  urgence: boolean().default(false),

  createdAt: timestamp("created_at").defaultNow(),
});
