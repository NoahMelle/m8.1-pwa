import Faq from "@/components/info/Faq";
import TransportOptions from "@/components/info/TransportOptions";
import React from "react";

export default function Info() {
  return (
    <div className="px-4 py-12 flex flex-col gap-8">
      <TransportOptions />
      <Faq />
    </div>
  );
}
