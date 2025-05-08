"use client";

import Logo from "@/components/Logo";
import BackgroundDecorations from "@/components/reusable/BackgroundDecorations";
import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import Link from "next/link";

export default function Homepage() {
  const t = useTranslations();

  return (
    <div className="w-full h-full flex flex-col justify-center grow pb-20">
      <BackgroundDecorations className="opacity-60" />

      <main className="flex flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-2">
          <Logo width={150} height={150} />
          <div className="flex flex-col justify-center">
            <p className="text-4xl font-semibold">Festival</p>
            <p className="text-red text-5xl">2025</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full px-4 max-w-[350px] mx-auto">
          <Link
            href={"/info"}
            className="bg-red from-red bg-gradient-to-b active:scale-[98%] transition-transform to-red-600 text-white rounded-md w-full flex justify-center p-4"
          >
            {t(messages.homepage.about)}
          </Link>
          <Link
            href={"/timetable"}
            className="border-red border-2 active:scale-[98%] transition-transform rounded-md w-full flex justify-center p-4"
          >
            {t(messages.homepage.timetable)}
          </Link>
        </div>
      </main>
    </div>
  );
}
