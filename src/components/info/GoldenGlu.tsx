"use client";

import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React from "react";

export default function GoldenGlu() {
  const t = useTranslations();

  return (
    <div>
      <h2>Golden GLU</h2>
      <p>{t(messages.info.goldenGlu)}</p>
    </div>
  );
}
