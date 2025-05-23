import React, { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { PerformanceWithStageType } from "@/@types/types";
import Image from "next/image";
import { formatDateToTime } from "@/lib/utils";
import { useTranslations } from "@/i18n/useTranslations";
import { useTimetable } from "./TimetableContext";
import { Star } from "lucide-react";

export default function ActPopup({
  act,
  setIsShowing,
}: {
  act: PerformanceWithStageType;
  setIsShowing: Dispatch<SetStateAction<PerformanceWithStageType | null>>;
}) {
  const t = useTranslations();

  const { toggleFavouriteAct, favouriteActs } = useTimetable();

  return (
    <motion.div
      className="fixed bg-black/20 dark:bg-black/60 p-4 left-0 top-0 h-[100dvh] w-full z-20"
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
        <div className="bg-white dark:bg-neutral-900 border-white/10 border p-4 rounded-md w-full max-w-[500px] relative z-20 overflow-y-auto max-h-full">
          <div className="w-full justify-between flex items-center mb-2">
            <h3 className="font-semibold text-lg">{act.title}</h3>
            <button onClick={() => setIsShowing(null)}>X</button>
          </div>
          <div className="flex flex-col gap-4">
            {act.imageUrl && (
              <Image
                src={act.imageUrl}
                width={0}
                height={0}
                alt={act.title}
                className="aspect-[5/2] object-cover w-full h-full"
                sizes="100%"
              />
            )}
            {act.videoUrl && (
              <iframe
                width="560"
                height="315"
                src={act.videoUrl}
                title="YouTube video player"
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            )}
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-[min-content_1fr] gap-x-4 leading-tight">
                <p className="text-nowrap">Starts at: </p>
                <p>{formatDateToTime(act.startsAt)}</p>
                <p className="text-nowrap">Ends at: </p>
                <p>{formatDateToTime(act.endsAt)}</p>
                <p className="text-nowrap">Stage:</p>
                <p>{act.stage?.name}</p>
              </div>
              {favouriteActs && (
                <button onClick={() => toggleFavouriteAct(act.id)}>
                  <Star
                    fill={
                      favouriteActs?.includes(act.id) ? "white" : "transparent"
                    }
                    width={20}
                    height={20}
                  />
                </button>
              )}
            </div>
            <p className="leading-tight">{t(act.description)}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
