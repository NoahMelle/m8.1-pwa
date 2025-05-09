"use client";

import Faq from "@/components/info/Faq";
import GoldenGlu from "@/components/info/GoldenGlu";
import TransportOptions from "@/components/info/TransportOptions";
import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React from "react";

export default function Info() {
  const t = useTranslations();

  return (
    <div className="px-4 py-12 flex flex-col gap-8">
      <h1 className="text-center pb-0 text-5xl">{t(messages.info.heading)}</h1>
      <p className="opacity-80">{t(messages.info.subHeading)}</p>
      <TransportOptions />
      <Faq />
      <GoldenGlu />
    </div>
  );
}
