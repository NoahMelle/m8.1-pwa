import { PerformanceWithStageType } from "@/@types/types";
import { formatDateToTime, getDatePercent } from "@/lib/dateUtils";
import React, { Dispatch, SetStateAction } from "react";
import { useTimetable } from "./TimetableContext";
import { Star } from "lucide-react";

export default function Act({
  act,
  setHighlightedAct,
}: {
  act: PerformanceWithStageType;
  setHighlightedAct: Dispatch<SetStateAction<PerformanceWithStageType | null>>;
}) {
  const { favouriteActs, toggleFavouriteAct } = useTimetable();
  return (
    <div
      key={act.id}
      className="absolute pr-[8px] block text-white h-full active:pt-1 transition-[padding_0.1s] group"
      style={{
        left: `${getDatePercent(act.startsAt)}%`,
        width: `${
          getDatePercent(
            act.endsAt < act.startsAt
              ? new Date(new Date(act.endsAt).getTime() + 24 * 60 * 60 * 1000)
              : act.endsAt
          ) - getDatePercent(act.startsAt)
        }%`,
      }}
    >
      <div className="w-full h-full relative">
        <button
          className="absolute w-full h-full left-0 top-0"
          onClick={() => setHighlightedAct(act)}
          aria-label={`Show details for ${act.title}`}
        ></button>
        <div className="bg-red group-active:border-0 p-2 border-b-4 border-red-900/30 transition-[border_0.1s] flex flex-col h-full w-full rounded-md text-start text-nowrap truncate justify-between items-end act-block">
          <div className="flex flex-col text-start w-full">
            <span className="truncate">{act.title}</span>
            <span className="text-xs truncate">
              {formatDateToTime(act.startsAt)} - {formatDateToTime(act.endsAt)}
            </span>
          </div>
          <button
            onClick={() => toggleFavouriteAct(act.id)}
            aria-label="Mark act as favourite"
          >
            <Star
              className="invert-0"
              fill={favouriteActs?.includes(act.id) ? "white" : "transparent"}
              color="white"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
