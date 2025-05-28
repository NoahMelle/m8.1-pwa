import { DayType } from "@/@types/types";
import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React, { Dispatch, SetStateAction } from "react";

export default function DaySelector({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: DayType;
  setSelectedDay: Dispatch<SetStateAction<DayType>>;
}) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={() => setSelectedDay("saturday")}
        className={`${
          selectedDay === "saturday" ? "bg-red text-white" : "hover:bg-red/20"
        } px-4 rounded-md border-2 border-red transition-colors`}
      >
        {t(messages.global.weekdays.saturday)}
      </button>
      <button
        onClick={() => setSelectedDay("sunday")}
        className={`${
          selectedDay === "sunday" ? "bg-red text-white" : "hover:bg-red/20"
        } px-4 py-2 rounded-md border-2 border-red transition-colors`}
      >
        {t(messages.global.weekdays.sunday)}
      </button>
    </div>
  );
}
