import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "motion/react";
import { PerformanceType, StageType } from "@/@types/types";
import { getCurrentActForStage, getNextActForStage } from "@/lib/fetchers";
import Image from "next/image";
import { formatDateToTime } from "@/lib/utils";
import { useTranslations } from "@/i18n/useTranslations";
import { messages } from "@/i18n/messages";

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
            <button onClick={() => setIsShowing(null)}>X</button>
          </div>
          <p className="leading-tight whitespace-pre-wrap my-4">
            {t(stage.description).trim()}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3>{t(messages.map.popup.currentAct)}:</h3>

              <div className="relative aspect-square flex flex-col justify-between dark:bg-neutral-800/50 bg-white/30 backdrop-blur-lg rounded-lg p-4 border dark:border-white/20 border-black/10 shadow-sm">
                <div className="flex flex-col justify-end h-full">
                  {!!currentAct ? (
                    <>
                      <Image
                        src={"/icons/fast_forward.svg"}
                        height={100}
                        width={100}
                        alt="Fast forward"
                        className="dark:invert-0 invert absolute top-1/2 left-1/2 -translate-1/2 opacity-10"
                      />
                      <div>
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
                    <>
                      <Image
                        src={"/icons/no_music.svg"}
                        height={100}
                        width={100}
                        alt="No music"
                        className="dark:invert-0 invert absolute top-1/2 left-1/2 -translate-1/2 opacity-10"
                      />
                      <p>{t(messages.map.popup.noCurrent)}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3>{t(messages.map.popup.nextAct)}:</h3>
              <div className="relative aspect-square flex overflow-hidden flex-col justify-between dark:bg-neutral-800/50 bg-white/30 backdrop-blur-lg rounded-lg p-4 border dark:border-white/20 border-black/10 shadow-sm">
                <div className="flex flex-col justify-end h-full">
                  {!!nextAct ? (
                    <>
                      <Image
                        src={nextAct.imageUrl ?? "/icons/fast_forward.svg"}
                        height={0}
                        width={0}
                        layout="fill"
                        alt="Fast forward"
                        className="absolute -z-[1]"
                      />
                      <div className="z-10 relative text-white">
                        <p>{nextAct.title}</p>
                        <div className="opacity-50 text-sm leading-tight">
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
                      <Image
                        src={"/icons/no_music.svg"}
                        height={100}
                        width={100}
                        alt="No music"
                        className="dark:invert-0 invert absolute top-1/2 left-1/2 -translate-1/2 opacity-10"
                      />
                      <p>{t(messages.map.popup.noNextAct)}</p>
                    </>
                  )}
                  <div className="bg-gradient-to-b from-transparent to-black/60 absolute top-0 left-0 w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
