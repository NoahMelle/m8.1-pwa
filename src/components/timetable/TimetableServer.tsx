import React from "react";
import TimetableClient from "./TimetableClient";
import { getGroupedActsForDate } from "@/lib/fetchers";
import { TimetableContextProvider } from "./TimetableContext";

export default async function TimetableServer() {
  const performances = await getGroupedActsForDate("saturday");

  return (
    <TimetableContextProvider initialGroupedActs={performances}>
      <TimetableClient />
    </TimetableContextProvider>
  );
}
