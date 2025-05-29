import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "motion/react";
import { PerformanceType, StageType } from "@/@types/types";
import { getCurrentActForStage, getNextActForStage } from "@/lib/fetchers";
import { formatDateToTime } from "@/lib/utils";
import { useTranslations } from "@/i18n/useTranslations";
import { messages } from "@/i18n/messages";
import LocationPopupCard from "./LocationPopupCard";
import Image from "next/image";
import { X } from "lucide-react";

export default function LocationPopup({
  stage,
  setIsShowing,
}: {
  stage: StageType;
  setIsShowing: Dispatch<SetStateAction<StageType | null>>;
}) {
  const [nextAct, setNextAct] = useState<PerformanceType | null | undefined>(
    null
  );
  const [currentAct, setCurrentAct] = useState<
    PerformanceType | null | undefined
  >(null);
  const t = useTranslations();

  useEffect(() => {
    getNextActForStage(stage.id).then((data) => {
      if (data) {
        setNextAct(data);
      }
    });
    getCurrentActForStage(stage.id).then((data) => {
      if (data) {
        setCurrentAct(data);
      }
    });
  }, [stage]);

  return (
    <motion.div
      className="fixed bg-black/20 dark:bg-black/60 p-4 left-0 top-0 h-[100dvh] w-full z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="w-full h-full absolute top-0 left-0"
        onClick={() => setIsShowing(null)}
      ></button>
      <motion.div
        className="h-full w-full flex items-center justify-center"
        initial={{
          y: "100%",
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: "100%",
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="bg-white dark:bg-neutral-900 border-white/10 border p-4 rounded-md w-full relative z-20">
          <div className="w-full justify-between flex items-center mb-2">
            <h3 className="font-semibold text-lg">{stage.name}</h3>
            <button onClick={() => setIsShowing(null)}>
              <X />
            </button>
          </div>
          <p className="whitespace-pre-wrap my-4">
            {t(stage.description).trim()}
          </p>
          <div className={`grid grid-cols-2 gap-4`}>
            <LocationPopupCard
              title={t(messages.map.popup.currentAct)}
              hasOverlay={!!currentAct?.imageUrl}
            >
              {!!currentAct ? (
                <>
                  <div className="z-10 relative">
                    <p>{currentAct.title}</p>
                    <p>
                      {currentAct.startsAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {currentAct.endsAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </>
              ) : (
                <p>{t(messages.map.popup.noCurrent)}</p>
              )}
            </LocationPopupCard>
            <LocationPopupCard
              title={t(messages.map.popup.nextAct)}
              hasOverlay={!!nextAct?.imageUrl}
            >
              {!!nextAct ? (
                <>
                  {nextAct.imageUrl && (
                    <Image
                      src={nextAct.imageUrl}
                      alt={nextAct.title}
                      fill
                      className="absolute w-full h-full -z-[1] top-0 left-0"
                    />
                  )}
                  <div className="z-10 relative">
                    <p>{nextAct.title}</p>
                    <div className="opacity-50 text-sm">
                      <p>{nextAct.startsAt.toLocaleDateString()}</p>
                      <p>
                        {formatDateToTime(nextAct.startsAt)} -{" "}
                        {formatDateToTime(nextAct.endsAt)}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>{t(messages.map.popup.noNextAct)}</p>
                </>
              )}
            </LocationPopupCard>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
