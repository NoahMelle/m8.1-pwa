import React from "react";
import TimetableClient from "./TimetableClient";
import { getGroupedActsForDate } from "@/lib/fetchers";

export default async function TimetableServer() {
  const performances = await getGroupedActsForDate("saturday");

  return <TimetableClient initialActs={performances} />;
}
