"use client";

import { PerformanceWithStageType } from "@/@types/types";
import { getGroupedActsForDate } from "@/lib/fetchers";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import ActPopup from "./ActPopup";
import DaySelector from "./DaySelector";
import StageRow from "./StageRow";
import TimeMarkers from "./TimeMarkers";
import { useTimetable } from "./TimetableContext";
import TimeMarkerLines from "./TimeMarkerLines";

export default function TimetableClient() {
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday">(
    "saturday"
  );
  const [highlightedAct, setHighlightedAct] =
    useState<PerformanceWithStageType | null>(null);
  const isFirstRender = useRef(true);

  const { groupedActs, setGroupedActs } = useTimetable();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getGroupedActsForDate(selectedDay).then((data) => {
      setGroupedActs(data);
    });
  }, [selectedDay, setGroupedActs]);

  return (
    <div>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
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
