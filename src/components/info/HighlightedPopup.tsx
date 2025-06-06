import React, { Dispatch, SetStateAction } from "react";
import { TransportOptionType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import Popup from "../reusable/Popup";

export default function HighlightedPopup({
  option,
  setIsShowing,
}: {
  option: TransportOptionType;
  setIsShowing: Dispatch<SetStateAction<TransportOptionType | null>>;
}) {
  const t = useTranslations();

  return (
    <Popup heading={t(option.name)} hidePopup={() => setIsShowing(null)}>
      <p className="whitespace-pre-wrap">{t(option.description).trim()}</p>
    </Popup>
  );
}
