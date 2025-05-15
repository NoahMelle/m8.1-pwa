import { PerformanceWithStageType } from "@/@types/types";
import React, { Dispatch, SetStateAction } from "react";
import { useTimetable } from "./TimetableContext";
import Act from "./Act";

export default function StageRow({
  stageName,
  acts,
  setHighlightedAct,
}: {
  stageName: string;
  acts: PerformanceWithStageType[];
  setHighlightedAct: Dispatch<SetStateAction<PerformanceWithStageType | null>>;
}) {
  const { favouriteActs } = useTimetable();

  return (
    <>
      {stageName}

      <div className="flex relative h-24 w-full">
        <div className="relative flex h-full w-full min-w-[1500px]">
          {favouriteActs !== null &&
            acts.map((act) => (
              <Act
                key={act.id}
                act={act}
                setHighlightedAct={setHighlightedAct}
              />
            ))}
        </div>
      </div>
    </>
  );
}
