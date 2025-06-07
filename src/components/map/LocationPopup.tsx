import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PerformanceType, StageType } from "@/@types/types";
import { getCurrentActForStage, getNextActForStage } from "@/lib/fetchers";
import { useTranslations } from "@/i18n/useTranslations";
import { messages } from "@/i18n/messages";
import LocationPopupCard from "./LocationPopupCard";
import Image from "next/image";
import Popup from "../reusable/Popup";
import Spinner from "../reusable/Spinner";
import { formatDateToTime } from "@/lib/dateUtils";

export default function LocationPopup({
  stage,
  setIsShowing,
}: {
  stage: StageType;
  setIsShowing: Dispatch<SetStateAction<StageType | null>>;
}) {
  const [nextAct, setNextAct] = useState<PerformanceType | null | undefined>(
    undefined
  );
  const [currentAct, setCurrentAct] = useState<
    PerformanceType | null | undefined
  >(undefined);
  const t = useTranslations();

  useEffect(() => {
    getNextActForStage(stage.id).then((data) => {
      setNextAct(data);
    });
    getCurrentActForStage(stage.id).then((data) => {
      setCurrentAct(data);
    });
  }, [stage]);

  return (
    <Popup heading={stage.name} hidePopup={() => setIsShowing(null)}>
      <p className="whitespace-pre-wrap my-4">{t(stage.description).trim()}</p>
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
          ) : currentAct === null ? (
            <p>{t(messages.map.popup.noCurrent)}</p>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Spinner />
            </div>
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
          ) : currentAct === null ? (
            <>
              <p>{t(messages.map.popup.noNextAct)}</p>
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </LocationPopupCard>
      </div>
    </Popup>
  );
}
