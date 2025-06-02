"use client";

import { PerformanceType, StageType } from "@/@types/types";
import React from "react";
import CurrentAct from "./CurrentAct";
import { nanoid } from "nanoid";
import { motion } from "motion/react";

export default function CurrentActs({
  stages,
  currentlyPlaying,
}: {
  stages: StageType[];
  currentlyPlaying: (PerformanceType | null)[];
}) {
  const containerVars = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full gap-2 flex flex-col overflow-hidden"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {stages.map((stage, index) => (
        <CurrentAct
          key={nanoid()}
          stage={stage}
          currentlyPlaying={currentlyPlaying[index]}
        />
      ))}
    </motion.div>
  );
}
