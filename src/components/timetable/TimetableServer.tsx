import React from "react";
import TimetableClient from "./TimetableClient";
import { getAllGenres, getGroupedActsForDate, getStages } from "@/lib/fetchers";
import { TimetableContextProvider } from "./TimetableContext";

export default async function TimetableServer() {
  const performances = await getGroupedActsForDate("saturday");
  const genres = await getAllGenres();
  const stages = await getStages();

  return (
    <TimetableContextProvider initialGroupedActs={performances}>
      <TimetableClient genres={genres} stages={stages} />
    </TimetableContextProvider>
  );
}
