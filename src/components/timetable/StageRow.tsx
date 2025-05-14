import { PerformanceWithStageType } from "@/@types/types";
import { getDatePercent } from "@/lib/dateUtils";
import { formatDateToTime } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function StageRow({
  stageName,
  acts,
  setHighlightedAct,
}: {
  stageName: string;
  acts: PerformanceWithStageType[];
  setHighlightedAct: Dispatch<SetStateAction<PerformanceWithStageType | null>>;
}) {
  return (
    <>
      {stageName}

      <div className="flex relative h-24 w-full">
        <div className="relative flex h-full w-full min-w-[1000px]">
          {acts.map((act) => (
            <button
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
              onClick={() => setHighlightedAct(act)}
            >
              <span className="bg-red p-2 border-b-4 border-red-900/30 transition-[border_0.1s] active:border-0 flex flex-col h-full w-full rounded-md text-start text-nowrap truncate">
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
    </>
  );
}
