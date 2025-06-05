import {
  int,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const pushSubscriptionsTable = mysqlTable("push_subscriptions", {
  id: int().primaryKey().autoincrement(),
  endpoint: varchar("endpoint", { length: 3072 }).notNull(),
  keys: json("keys").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
