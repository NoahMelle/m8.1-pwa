"use client";

import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import Link from "next/link";

export default function Homepage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full px-4 max-w-[350px] mx-auto">
      <Link
        href={"/info"}
        className="bg-red active:scale-[98%] transition-transform text-white rounded-lg w-full flex justify-center p-4"
      >
        {t(messages.homepage.about)}
      </Link>
      <Link
        href={"/timetable"}
        className="border-red border-2 active:scale-[98%] transition-transform rounded-lg w-full flex justify-center p-4"
      >
        {t(messages.homepage.timetable)}
      </Link>
    </div>
  );
}
