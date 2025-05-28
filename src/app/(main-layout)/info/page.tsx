import Faq from "@/components/info/Faq";
import GoldenGlu from "@/components/info/GoldenGlu";
import TransportOptions from "@/components/info/TransportOptions";
import Translated from "@/components/reusable/Translated";
import { messages } from "@/i18n/messages";
import { Calendar, Map, MapPin } from "lucide-react";
import React from "react";

export default async function Info() {
  return (
    <>
      <h1>
        <Translated message={messages.info.heading} />
      </h1>
      <p>
        <Translated message={messages.info.subHeading} />
      </p>
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
          <p>
            <Translated message={messages.info.general.date} />
          </p>
        </div>
      </div>
      <TransportOptions />
      <Faq />
      <GoldenGlu />
    </>
  );
}
