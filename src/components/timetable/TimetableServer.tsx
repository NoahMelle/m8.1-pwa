import React from "react";
import TimetableClient from "./TimetableClient";
import { getAllGenres, getGroupedActsForDate, getStages } from "@/lib/fetchers";
import { TimetableContextProvider } from "./TimetableContext";
import { PerformanceWithStageType } from "@/@types/types";

export default async function TimetableServer() {
  const [saturdayRes, sundayRes] = await Promise.all([
    getGroupedActsForDate("saturday"),
    getGroupedActsForDate("sunday"),
  ]);

  const performances: Record<
    "saturday" | "sunday",
    Map<string, PerformanceWithStageType[]>
  > = {
    saturday: saturdayRes,
    sunday: sundayRes,
  };

  const genres = await getAllGenres();
  const stages = await getStages();

  return (
    <TimetableContextProvider initialGroupedActs={performances}>
      <TimetableClient genres={genres} stages={stages} />
    </TimetableContextProvider>
  );
}
