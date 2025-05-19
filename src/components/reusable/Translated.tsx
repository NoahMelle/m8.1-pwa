"use client";

import { Locale } from "@/i18n/settings";
import { useTranslations } from "@/i18n/useTranslations";

export default function Translated({
  message,
}: {
  message: Record<Locale, string>;
}) {
  const t = useTranslations();

  return t(message);
}
