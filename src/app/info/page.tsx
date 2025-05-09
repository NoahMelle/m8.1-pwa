"use client";

import Faq from "@/components/info/Faq";
import GoldenGlu from "@/components/info/GoldenGlu";
import TransportOptions from "@/components/info/TransportOptions";
import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import Image from "next/image";
import React from "react";

export default function Info() {
  const t = useTranslations();

  return (
    <div className="px-4 py-12 flex flex-col gap-8">
      <h1 className="text-center pb-0 text-5xl">{t(messages.info.heading)}</h1>
      <p>{t(messages.info.subHeading)}</p>
      <div className="text-sm leading-tight">
        <div className="flex gap-2 items-center">
          <Image
            src={"/icons/location.svg"}
            height={24}
            width={24}
            alt="Location Pin"
            className="dark:invert-0 invert"
          />
          <p>Strijkviertel, Utrecht</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/icons/map.svg"}
            height={24}
            width={24}
            alt="Map"
            className="dark:invert-0 invert"
          />
          <p>Strijkviertelweg, Utrecht</p>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={"/icons/date.svg"}
            height={24}
            width={24}
            alt="Calendar"
            className="dark:invert-0 invert"
          />
          <p>{t(messages.info.general.date)}</p>
        </div>
      </div>
      <TransportOptions />
      <Faq />
      <GoldenGlu />
    </div>
  );
}
