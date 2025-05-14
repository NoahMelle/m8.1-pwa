import { StageType } from "@/@types/types";
import { AnimatePresence } from "motion/react";
import React, { Dispatch, SetStateAction } from "react";
import { KeepScale } from "react-zoom-pan-pinch";
import { motion } from "motion/react";

export default function MapLocation({
  stage,
  scale,
  setHighlightedLocation,
}: {
  stage: StageType;
  scale: number;
  setHighlightedLocation: Dispatch<SetStateAction<StageType | null>>;
}) {
  return (
    <KeepScale
      key={stage.name}
      style={{
        left: `${stage.xPosition}%`,
        top: `${stage.yPosition}%`,
      }}
      className="absolute -translate-1/2 z-[1]"
      onClick={() => setHighlightedLocation(stage)}
    >
      <div className="h-4 w-4 rounded-full bg-red border-red-700 dark:bg-red-700 dark:border-red-800 border-2"></div>
      <AnimatePresence>
        {scale > 3 && (
          <motion.h3
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-nowrap dark:bg-red-700 bg-red border-red-700 border-2 text-white dark:border-red-800 px-2 py-1 leading-tight rounded-sm"
            initial={{ y: "100%", opacity: 0, scale: 0 }}
            exit={{ y: "100%", opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
          >
            {stage.name}
          </motion.h3>
        )}
      </AnimatePresence>
    </KeepScale>
  );
}
