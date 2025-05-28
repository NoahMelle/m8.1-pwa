"use client";

import { PerformanceType, StageType } from "@/@types/types";
import { messages } from "@/i18n/messages";
import Image from "next/image";
import React from "react";
import Translated from "../reusable/Translated";
import { motion } from "motion/react";
import Card from "../reusable/Card";

export default function CurrentAct({
  stage,
  currentlyPlaying,
}: {
  stage: StageType;
  currentlyPlaying?: PerformanceType | null;
}) {
  const itemVars = {
    hidden: { opacity: 0, y: "100%" },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVars}>
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
        <div className="flex flex-col justify-center leading-tight">
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
