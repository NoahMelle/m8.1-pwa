"use client";

import { messages, transportOptions } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React, { useEffect, useState } from "react";
import HighlightedPopup from "./HighlightedPopup";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Info } from "lucide-react";
import Card from "../reusable/Card";
import { TransportOption } from "@/@types/types";

export default function TransportOptions() {
  const [highlightedOption, setHighlightedOption] =
    useState<TransportOption | null>(null);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [screenSize, setScreenSize] = useState<number | null>(null);

  const t = useTranslations();

  useEffect(() => {
    function updateScreenSize() {
      if (!window) return;

      setScreenSize(window.innerWidth);
    }

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  function mapScreenSizeToGridColumns() {
    if (!screenSize) return 2;

    if (screenSize >= 768) {
      return 4;
    } else if (screenSize >= 640) {
      return 3;
    }

    return 2;
  }

  return (
    <div>
      <h2>{t(messages.info.transportOptions)}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-hidden">
        {transportOptions.map((transportOption, i) =>
          !isShowingMore && i >= mapScreenSizeToGridColumns() ? null : (
            <Card
              key={transportOption.id}
              className="relative aspect-square flex flex-col justify-between"
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
              <h3>{t(transportOption.name)}</h3>
            </Card>
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
