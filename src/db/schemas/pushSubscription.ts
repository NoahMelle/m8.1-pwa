import { int, json, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";

export const pushSubscriptionsTable = mysqlTable("push_subscriptions", {
  id: int().primaryKey().autoincrement(),
  endpoint: text("endpoint").notNull().unique(),
  keys: json("keys").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
