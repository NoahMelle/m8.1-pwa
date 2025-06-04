"use client";

import { PerformanceType, StageType } from "@/@types/types";
import { messages } from "@/i18n/messages";
import Image from "next/image";
import React from "react";
import Translated from "../reusable/Translated";
import { motion, Variants } from "motion/react";
import Card from "../reusable/Card";

export default function CurrentAct({
  stage,
  currentlyPlaying,
}: {
  stage: StageType;
  currentlyPlaying?: PerformanceType | null;
}) {
  const itemVars: Variants = {
    hidden: { opacity: 0, x: "-100%" },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={itemVars}
      transition={{ type: "spring", duration: 1, bounce: 0.5 }}
    >
      <Card className="flex gap-4">
        <div>
          <Image
            className="aspect-square object-cover rounded-full"
            src={`/img/stages/${stage.name
              .toLocaleLowerCase()
              .replaceAll(" ", "-")}.png`}
            alt={stage.name}
            width={70}
            height={70}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3>{stage.name}</h3>
          <p className="text-foreground/50">
            {" "}
            {currentlyPlaying ? (
              currentlyPlaying.title
            ) : (
              <Translated message={messages.map.popup.noCurrent} />
            )}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
