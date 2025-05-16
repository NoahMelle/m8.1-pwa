"use client";

import { GenreType, PerformanceWithStageType, StageType } from "@/@types/types";
import { getGroupedActsForDate } from "@/lib/fetchers";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import ActPopup from "./ActPopup";
import DaySelector from "./DaySelector";
import StageRow from "./StageRow";
import TimeMarkers from "./TimeMarkers";
import { useTimetable } from "./TimetableContext";
import TimeMarkerLines from "./TimeMarkerLines";
import { groupPerformancesByStage, toggleArrayItem } from "@/lib/utils";

export default function TimetableClient({
  genres,
  stages,
}: {
  genres: GenreType[];
  stages: StageType[];
}) {
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday">(
    "saturday"
  );
  const [highlightedAct, setHighlightedAct] =
    useState<PerformanceWithStageType | null>(null);
  const isFirstRender = useRef(true);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { groupedActs, setGroupedActs, allActs } = useTimetable();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      getGroupedActsForDate(selectedDay).then((data) => {
        setGroupedActs(data);
      });
    } catch {
      throw new Error("Failed to fetch data");
    }
  }, [selectedDay, setGroupedActs]);

  useEffect(() => {
    const newActs =
      selectedGenres.length === 0
        ? allActs.current
        : allActs.current.filter((act) =>
            act.genres.some((genre) => selectedGenres.includes(genre.genreId))
          );

    setGroupedActs(groupPerformancesByStage(newActs, stages));
  }, [selectedGenres, allActs, setGroupedActs, stages]);

  return (
    <div>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <div>
        {genres.map((genre) => (
          <label key={`genre-${genre.id}`}>
            <input
              type="checkbox"
              onChange={() =>
                setSelectedGenres((prev) => toggleArrayItem(prev, genre.id))
              }
              checked={selectedGenres.includes(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="p-4">
          <div className="relative grid w-fit grid-cols-[min-content_1fr] gap-2">
            <TimeMarkers />
            <TimeMarkerLines />
            {Array.from(groupedActs).map(([stageName, acts]) => (
              <StageRow
                key={stageName}
                stageName={stageName}
                acts={acts}
                setHighlightedAct={setHighlightedAct}
              />
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {highlightedAct && (
          <ActPopup setIsShowing={setHighlightedAct} act={highlightedAct} />
        )}
      </AnimatePresence>
    </div>
  );
}
