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
      <div className="text-sm leading-tight grid grid-cols-2 gap-2 grid-rows-[1fr_1fr] text-white">
        <div className="flex gap-2 items-center bg-blue border-b-4 border-b-blue-600 text-white rounded-md p-3 aspect-[16/7]">
          <MapPin height={24} width={24} />
          <p>Strijkviertel, Utrecht</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow rounded-md border-b-4 border-b-yellow-600 p-3">
          <Map height={24} width={24} />
          <p>Strijkviertelweg, Utrecht</p>
        </div>
        <div className="flex gap-2 items-center col-span-full bg-red rounded-md border-b-4 border-b-red-700 p-3">
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
