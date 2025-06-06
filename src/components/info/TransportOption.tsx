import React, { Dispatch, SetStateAction } from "react";
import Card from "../reusable/Card";
import { TransportOptionType } from "@/@types/types";
import { Info } from "lucide-react";
import { useTranslations } from "@/i18n/useTranslations";

export default function TransportOption({
  transportOption,
  setHighlightedOption,
}: {
  transportOption: TransportOptionType;
  setHighlightedOption: Dispatch<SetStateAction<TransportOptionType | null>>;
}) {
  const t = useTranslations();

  return (
    <Card className="relative aspect-square flex flex-col justify-between active:scale-[97%] transition-transform">
      <button
        onClick={() => setHighlightedOption(transportOption)}
        className="h-full w-full flex flex-col justify-between items-start"
      >
        <span className="w-full justify-end flex">
          <Info height={24} width={24} />
        </span>{" "}
        <span>{t(transportOption.name)}</span>
        <span className="absolute pointer-events-none w-full h-full top-1/2 left-1/2 -translate-1/2 flex items-center justify-center">
          <transportOption.image width={64} height={64} strokeWidth={1.5} />
        </span>
      </button>
    </Card>
  );
}
