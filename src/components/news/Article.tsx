"use client";

import { ArticleType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import React from "react";

export default function Article({ article }: { article: ArticleType }) {
  const t = useTranslations();

  return (
    <div>
      <h2>{t(article.title)}</h2>
    </div>
  );
}
