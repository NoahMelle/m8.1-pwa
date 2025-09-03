"use client";

import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React from "react";
import { WifiOff } from "lucide-react";

export const dynamic = "force-static";

export default function Offline() {
  const t = useTranslations();

  return (
    <>
      <h1>Offline</h1>
      <div className="flex flex-col justify-center items-center max-w-[200px] mx-auto">
        <WifiOff width={100} height={100} strokeWidth={1.5} />
        <h2 className="text-lg font-normal text-center">
          {t(messages.offline.subheading)}
        </h2>
      </div>
    </>
  );
}
