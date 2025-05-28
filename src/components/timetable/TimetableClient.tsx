"use client";

import { GenreType, PerformanceWithStageType, StageType } from "@/@types/types";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import ActPopup from "./ActPopup";
import DaySelector from "./DaySelector";
import StageRow from "./StageRow";
import TimeMarkers from "./TimeMarkers";
import { useTimetable } from "./TimetableContext";
import TimeMarkerLines from "./TimeMarkerLines";
import { groupPerformancesByStage } from "@/lib/utils";
import Filter from "./Filter";

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

  const { groupedActs, setGroupedActs, allActs, initialActs, setAllActs } =
    useTimetable();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setAllActs(Array.from(initialActs[selectedDay].values()).flat());
  }, [selectedDay, setGroupedActs, initialActs, setAllActs]);

  useEffect(() => {
    const newActs =
      selectedGenres.length === 0
        ? allActs
        : allActs.filter((act) =>
            act.genres.some((genre) => selectedGenres.includes(genre.genreId))
          );

    setGroupedActs(groupPerformancesByStage(newActs, stages));
  }, [selectedGenres, allActs, setGroupedActs, stages]);

  return (
    <div>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <hr className="my-4 opacity-20" />

      <div className="flex gap-2 my-2 overflow-x-auto">
        {genres.map((genre) => (
          <Filter
            genre={genre}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            key={`genre-${genre.id}`}
          />
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
