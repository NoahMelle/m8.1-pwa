import Faq from "@/components/info/Faq";
import GoldenGlu from "@/components/info/GoldenGlu";
import TransportOptions from "@/components/info/TransportOptions";
import { messages } from "@/i18n/messages";
import { getServerSideTranslations } from "@/i18n/server";
import { Calendar, Map, MapPin } from "lucide-react";
import React from "react";

export const dynamic = "force-static";

export default async function Info() {
  const t = await getServerSideTranslations();

  return (
    <>
      <h1 className="text-center pb-0 text-5xl">{t(messages.info.heading)}</h1>
      <p>{t(messages.info.subHeading)}</p>
      <div className="text-sm leading-tight">
        <div className="flex gap-2 items-center">
          <MapPin height={24} width={24} />
          <p>Strijkviertel, Utrecht</p>
        </div>
        <div className="flex items-center gap-2">
          <Map height={24} width={24} />
          <p>Strijkviertelweg, Utrecht</p>
        </div>
        <div className="flex gap-2 items-center">
          <Calendar height={24} width={24} />
          <p>{t(messages.info.general.date)}</p>
        </div>
      </div>
      <TransportOptions />
      <Faq />
      <GoldenGlu />
    </>
  );
}
