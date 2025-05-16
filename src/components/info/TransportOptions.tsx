"use client";

import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React, { useState } from "react";
import HighlightedPopup from "./HighlightedPopup";
import { AnimatePresence } from "motion/react";
import {
  Bike,
  Bus,
  Car,
  CarTaxiFront,
  ChevronDown,
  Info,
  LucideIcon,
  Ticket,
} from "lucide-react";

export interface TransportOption {
  id: number;
  name: string;
  description: string;
  image: LucideIcon;
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
        en: "There is a large free bicycle shed where you can park your bike all day.",
        nl: "Er is een grote gratis fietsenstalling aanwezig waar je jouw fiets de gehele dag kunt stallen.",
      }),
      image: Bike,
    },
    {
      id: 1,
      name: t({
        en: "Car",
        nl: "Auto",
      }),
      description: t({
        en: "You can purchase a parking ticket. You can park at P+R Papendorp, follow the signs 'P online ticket'. Did you not purchase a ticket in advance? Then you can purchase a parking ticket from the parking attendant on location (PIN ONLY). Please note: FULL=FULL",
        nl: "Je kunt een parkingticket aanschaffen. Parkeren kan op P+R Papendorp, volg hiervoor de borden 'P online ticket'. Heb je geen ticket van te voren gekocht? Dan kun je bij de parkeerwachter op locatie een parkeerticket aanschaffen (PIN ONLY). Let wel op: VOL=VOL",
      }),
      image: Car,
    },
    {
      id: 2,
      name: t({
        en: "Public Transport",
        nl: "OV",
      }),
      description: t({
        en: "Are you coming to Lief by public transport? Then plan your trip via 9292.nl.",
        nl: "Kom je met het openbaar vervoer naar Lief? Plan dan je trip via 9292.nl.",
      }),
      image: Ticket,
    },
    {
      id: 3,
      name: t({
        en: "Shuttle Bus",
        nl: "Shuttlebus",
      }),
      description: t({
        en: `From Utrecht Central Station you can take our free shuttle bus to the festival site. You can find this bus at the central station on Mineurslaan. Follow the white signs with black arrows and ' ❤️U Festival'. 

The bus runs between 12:00 and 19:00 towards the festival and from 21:00 you can get on again to go to the station.`,
        nl: `
        Vanaf Utrecht Centraal kun je onze gratis shuttlebus richting het festivalterrein pakken. Je vindt deze bus op het centraal station aan de Mineurslaan. Volg de witte bordjes met zwarte pijlen én ' ❤️U Festival'. 

De bus rijdt tussen 12:00 uur & 19:00 uur richting het festival en vanaf 21:00 uur kun je weer instappen om richting het station te gaan.`,
      }),
      image: Bus,
    },
    {
      id: 4,
      name: t({
        en: "Taxi + Kiss & Ride",
        nl: "Taxi + Kiss & Ride",
      }),
      description: t({
        en: `Navigate to Strijkviertel, De Meern (Utrecht). Follow the signs "Kiss & Ride ❤️U Festival", once you are near the festival grounds.`,
        nl: `Navigeer naar Strijkviertel, De Meern (Utrecht). Volg de borden "Kiss & Ride ❤️U Festival", zodra je in de buurt bent van het festivalterrein.`,
      }),
      image: CarTaxiFront,
    },
  ];

  return (
    <div>
      <h2>{t(messages.info.transportOptions)}</h2>

      <div className="grid grid-cols-2 gap-4">
        {transportOptions.map((transportOption, i) =>
          !isShowingMore && i > 1 ? null : (
            <div
              key={transportOption.id}
              className="relative aspect-square flex flex-col justify-between dark:bg-neutral-800/50 bg-white/30 backdrop-blur-lg rounded-lg p-4 border dark:border-white/20 border-black/10 shadow-sm"
            >
              <div className="w-full justify-end flex">
                <button onClick={() => setHighlightedOption(transportOption)}>
                  <Info height={24} width={24} />
                </button>
              </div>{" "}
              <div className="absolute pointer-events-none w-full h-full top-1/2 left-1/2 -translate-1/2 flex items-center justify-center">
                <transportOption.image
                  width={64}
                  height={64}
                  strokeWidth={1.5}
                />
              </div>
              <h3>{transportOption.name}</h3>
            </div>
          )
        )}
      </div>
      <button
        onClick={() => setIsShowingMore((prev) => !prev)}
        className={`text-red mt-2 flex items-center`}
      >
        {isShowingMore
          ? t(messages.global.showLess)
          : t(messages.global.showMore)}
        <span
          className={` ${
            isShowingMore ? "rotate-180" : ""
          } transition-transform`}
        >
          <ChevronDown />
        </span>
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
