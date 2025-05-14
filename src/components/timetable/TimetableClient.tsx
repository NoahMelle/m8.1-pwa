"use client";

import { PerformanceWithStageType } from "@/@types/types";
import { getGroupedActsForDate } from "@/lib/fetchers";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import ActPopup from "./ActPopup";
import DaySelector from "./DaySelector";
import StageRow from "./StageRow";
import TimeMarkers from "./TimeMarkers";

export default function TimetableClient({
  initialActs,
}: {
  initialActs: Map<string, PerformanceWithStageType[]>;
}) {
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday">(
    "saturday"
  );
  const [groupedActs, setGroupedActs] =
    useState<Map<string, PerformanceWithStageType[]>>(initialActs);
  const [highlightedAct, setHighlightedAct] =
    useState<PerformanceWithStageType | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getGroupedActsForDate(selectedDay).then((data) => {
      setGroupedActs(data);
    });
  }, [selectedDay]);

  return (
    <div>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className="overflow-x-auto">
        <div className="relative grid grid-cols-[min-content_1fr] gap-2 p-4">
          <TimeMarkers />
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
      <AnimatePresence>
        {highlightedAct && (
          <ActPopup setIsShowing={setHighlightedAct} act={highlightedAct} />
        )}
      </AnimatePresence>
    </div>
  );
}
