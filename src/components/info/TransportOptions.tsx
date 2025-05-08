"use client";

import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import Image from "next/image";
import React, { useState } from "react";
import HighlightedPopup from "./HighlightedPopup";
import { AnimatePresence } from "motion/react";

export interface TransportOption {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export default function TransportOptions() {
  const [highlightedOption, setHighlightedOption] =
    useState<TransportOption | null>(null);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const t = useTranslations();

  const transportOptions: TransportOption[] = [
    {
      id: 0,
      name: t({
        en: "Bike",
        nl: "Fiets",
      }),
      description: t({
        en: "Er is een grote gratis fietsenstalling aanwezig waar je jouw fiets de gehele dag kunt stallen.",
        nl: "Er is een grote gratis fietsenstalling aanwezig waar je jouw fiets de gehele dag kunt stallen.",
      }),
      imageUrl: "/icons/bike.svg",
    },
    {
      id: 1,
      name: t({
        en: "Car",
        nl: "Auto",
      }),
      description: t({
        en: "Je kunt een parkingticket aanschaffen. Parkeren kan op P+R Papendorp, volg hiervoor de borden 'P online ticket'. Heb je geen ticket van te voren gekocht? Dan kun je bij de parkeerwachter op locatie een parkeerticket aanschaffen (PIN ONLY). Let wel op: VOL=VOL",
        nl: "Je kunt een parkingticket aanschaffen. Parkeren kan op P+R Papendorp, volg hiervoor de borden 'P online ticket'. Heb je geen ticket van te voren gekocht? Dan kun je bij de parkeerwachter op locatie een parkeerticket aanschaffen (PIN ONLY). Let wel op: VOL=VOL",
      }),
      imageUrl: "/icons/car.svg",
    },
    {
      id: 2,
      name: t({
        en: "Shuttle Bus",
        nl: "Shuttlebus",
      }),
      description: t({
        en: `Vanaf Utrecht Centraal kun je onze gratis shuttlebus richting het festivalterrein pakken. Je vindt deze bus op het centraal station aan de Mineurslaan. Volg de witte bordjes met zwarte pijlen én ' ❤️U Festival'. 

De bus rijdt tussen 12:00 uur & 19:00 uur richting het festival en vanaf 21:00 uur kun je weer instappen om richting het station te gaan.`,
        nl: `
        Vanaf Utrecht Centraal kun je onze gratis shuttlebus richting het festivalterrein pakken. Je vindt deze bus op het centraal station aan de Mineurslaan. Volg de witte bordjes met zwarte pijlen én ' ❤️U Festival'. 

De bus rijdt tussen 12:00 uur & 19:00 uur richting het festival en vanaf 21:00 uur kun je weer instappen om richting het station te gaan.`,
      }),
      imageUrl: "/icons/shuttle_bus.svg",
    },
  ];

  return (
    <div className="px-4 py-12">
      <h2 className="font-bold text-2xl mb-4">
        {t(messages.info.transportOptions)}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {transportOptions.map((transportOption, i) =>
          !isShowingMore && i > 1 ? null : (
            <div
              key={transportOption.imageUrl}
              className="relative aspect-square flex flex-col justify-between dark:bg-black/30 bg-white/30 backdrop-blur-lg rounded-lg p-4 border dark:border-white/20 border-black/10 shadow-sm"
            >
              <div className="w-full justify-end flex">
                <button onClick={() => setHighlightedOption(transportOption)}>
                  <Image
                    src={"/icons/info.svg"}
                    height={24}
                    width={24}
                    alt="Information"
                    className="dark:invert-0 invert"
                  />
                </button>
              </div>{" "}
              <div className="absolute pointer-events-none w-full h-full top-1/2 left-1/2 -translate-1/2 flex items-center justify-center">
                <Image
                  src={transportOption.imageUrl}
                  alt={transportOption.name}
                  width={64}
                  height={64}
                  className="dark:invert-0 invert"
                />
              </div>
              <h3>{transportOption.name}</h3>
            </div>
          )
        )}
      </div>
      <button onClick={() => setIsShowingMore((prev) => !prev)} className="">
        {isShowingMore
          ? t(messages.global.showLess)
          : t(messages.global.showMore)}
      </button>
      <AnimatePresence mode="sync">
        {highlightedOption !== null && (
          <HighlightedPopup
            option={highlightedOption}
            setIsShowing={setHighlightedOption}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
