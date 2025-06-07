import React, { Dispatch, SetStateAction } from "react";
import { PerformanceWithStageType } from "@/@types/types";
import Image from "next/image";
import { useTranslations } from "@/i18n/useTranslations";
import { useTimetable } from "./TimetableContext";
import { Star } from "lucide-react";
import Popup from "../reusable/Popup";
import { formatDateToTime } from "@/lib/dateUtils";

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
    <Popup heading={act.title} hidePopup={() => setIsShowing(null)}>
      <div className="flex flex-col gap-4">
        {act.videoUrl && (
          <div className="aspect-video min-h-0">
            <iframe
              width="560"
              height="315"
              src={act.videoUrl}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        )}
        <div className="flex justify-between items-center gap-4">
          {act.imageUrl && (
            <Image
              src={act.imageUrl}
              width={0}
              height={0}
              alt={act.title}
              className="object-cover aspect-square rounded-full h-20 w-20 "
              sizes="100%"
            />
          )}
          <div className="grow justify-between items-start flex">
            <div className="flex gap-4">
              <div className="grid grid-cols-[min-content_1fr] gap-x-4 h-fit">
                <p className="text-nowrap">Starts at: </p>
                <p>{formatDateToTime(act.startsAt)}</p>
                <p className="text-nowrap">Ends at: </p>
                <p>{formatDateToTime(act.endsAt)}</p>
                <p className="text-nowrap">Stage:</p>
                <p>{act.stage?.name}</p>
              </div>
            </div>
            {favouriteActs && (
              <button
                onClick={() => toggleFavouriteAct(act.id)}
                aria-label="Mark act as favourite"
              >
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
        </div>
        <p>{t(act.description)}</p>
      </div>
    </Popup>
  );
}
