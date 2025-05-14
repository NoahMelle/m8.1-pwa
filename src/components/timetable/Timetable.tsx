"use client";

import { PerformanceWithStageType } from "@/@types/types";
import { getDatePercent } from "@/lib/dateUtils";
import { getActsForDate } from "@/lib/fetchers";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import ActPopup from "./ActPopup";
import { formatDateToTime } from "@/lib/utils";

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday">(
    "saturday"
  );
  const [acts, setActs] = useState<PerformanceWithStageType[]>([]);
  const [groupedActs, setGroupedActs] = useState<
    Map<string, PerformanceWithStageType[]>
  >(new Map());
  const [highlightedAct, setHighlightedAct] =
    useState<PerformanceWithStageType | null>(null);

  useEffect(() => {
    getActsForDate(selectedDay).then((data) => {
      setActs(data);
    });
  }, [selectedDay]);

  useEffect(() => {
    const groupMap = new Map<string, PerformanceWithStageType[]>();

    acts.forEach((act) => {
      if (act.stage) {
        const existingEntry = groupMap.get(act.stage.name);

        if (existingEntry) {
          groupMap.set(act.stage.name, [...existingEntry, act]);
        } else {
          groupMap.set(act.stage.name, [act]);
        }
      }
    });

    setGroupedActs(groupMap);
  }, [acts]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSelectedDay("saturday")}
          className={`${
            selectedDay === "saturday" ? "bg-red text-white" : "hover:bg-red/20"
          } p-4 rounded-md border-2 border-red transition-colors`}
        >
          Zaterdag
        </button>
        <button
          onClick={() => setSelectedDay("sunday")}
          className={`${
            selectedDay === "sunday" ? "bg-red text-white" : "hover:bg-red/20"
          } p-4 rounded-md border-2 border-red transition-colors`}
        >
          Zondag
        </button>
      </div>
      {acts.length >= 1 && (
        <div className="overflow-x-auto">
          <div className="relative grid grid-cols-[min-content_1fr] gap-2 p-4">
            <div className="relative flex w-full col-start-2 h-fit">
              <div className="w-full h-fit grid grid-cols-14">
                {Array.from({ length: 14 }, (_, i) => {
                  const hour = 10 + i;
                  const timeLabel = hour < 24 ? `${hour}:00` : "00:00";
                  return (
                    <p className="text-xs h-fit text-gray-500" key={timeLabel}>
                      {timeLabel}
                    </p>
                  );
                })}
              </div>
            </div>
            {Array.from(groupedActs).map(([stageName, acts]) => (
              <React.Fragment key={stageName}>
                {stageName}

                <div className="flex relative h-24 w-full">
                  <div className="relative flex h-full w-full min-w-[1000px]">
                    {acts.map((act) => (
                      <button
                        key={act.id}
                        className="absolute pr-[8px] block text-white h-full"
                        style={{
                          left: `${getDatePercent(act.startsAt)}%`,
                          width: `${
                            getDatePercent(
                              act.endsAt < act.startsAt
                                ? new Date(
                                    new Date(act.endsAt).getTime() +
                                      24 * 60 * 60 * 1000
                                  )
                                : act.endsAt
                            ) - getDatePercent(act.startsAt)
                          }%`,
                        }}
                        onClick={() => setHighlightedAct(act)}
                      >
                        <span className="bg-red p-2 flex flex-col h-full w-full rounded-sm text-start text-nowrap truncate">
                          <span className="truncate">{act.title}</span>
                          <span className="text-xs truncate">
                            {formatDateToTime(act.startsAt)} -{" "}
                            {formatDateToTime(act.endsAt)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      <AnimatePresence>
        {highlightedAct && (
          <ActPopup setIsShowing={setHighlightedAct} act={highlightedAct} />
        )}
      </AnimatePresence>
    </div>
  );
}
