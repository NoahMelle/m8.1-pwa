import { PerformanceWithStageType } from "@/@types/types";
import { getDatePercent } from "@/lib/dateUtils";
import { formatDateToTime } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import Star from "../icons/Star";
import { useTimetable } from "./TimetableContext";

export default function StageRow({
  stageName,
  acts,
  setHighlightedAct,
}: {
  stageName: string;
  acts: PerformanceWithStageType[];
  setHighlightedAct: Dispatch<SetStateAction<PerformanceWithStageType | null>>;
}) {
  const { favouriteActs, toggleFavouriteAct } = useTimetable();

  return (
    <>
      {stageName}

      <div className="flex relative h-24 w-full">
        <div className="relative flex h-full w-full min-w-[1500px]">
          {favouriteActs !== null &&
            acts.map((act) => (
              <div
                key={act.id}
                className="absolute pr-[8px] block text-white h-full  active:pt-1 transition-[padding_0.1s]"
                style={{
                  left: `${getDatePercent(act.startsAt)}%`,
                  width: `${
                    getDatePercent(
                      act.endsAt < act.startsAt
                        ? new Date(
                            new Date(act.endsAt).getTime() + 24 * 60 * 60 * 1000
                          )
                        : act.endsAt
                    ) - getDatePercent(act.startsAt)
                  }%`,
                }}
              >
                <div className="bg-red p-2 border-b-4 border-red-900/30 transition-[border_0.1s] active:border-0 flex flex-col h-full w-full rounded-md text-start text-nowrap truncate justify-between items-end">
                  <button
                    className="flex flex-col text-start w-full"
                    onClick={() => setHighlightedAct(act)}
                  >
                    <span className="truncate">{act.title}</span>
                    <span className="text-xs truncate">
                      {formatDateToTime(act.startsAt)} -{" "}
                      {formatDateToTime(act.endsAt)}
                    </span>
                  </button>
                  <button onClick={() => toggleFavouriteAct(act.id)}>
                    <Star
                      filled={favouriteActs.includes(act.id)}
                      className="invert-0"
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
