import Faq from "@/components/info/Faq";
import GoldenGlu from "@/components/info/GoldenGlu";
import InfoCard from "@/components/info/InfoCard";
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
      <div className="text-sm grid grid-cols-2 gap-2 grid-rows-[1fr_1fr] text-white">
        <InfoCard Icon={MapPin} className="bg-blue">
          Strijkviertel, Utrecht
        </InfoCard>
        <InfoCard Icon={Map} className="bg-yellow">
          Strijkviertelweg, Utrecht
        </InfoCard>

        <InfoCard Icon={Calendar} className="bg-red col-span-full aspect-auto">
          <Translated message={messages.info.general.date} />
        </InfoCard>
      </div>
      <TransportOptions />
      <Faq />
      <GoldenGlu />
    </>
  );
}
