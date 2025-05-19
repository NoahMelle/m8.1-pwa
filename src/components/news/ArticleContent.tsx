"use client";

import { ArticleType } from "@/@types/types";
import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import Image from "next/image";
import React from "react";

export default function ArticleContent({ article }: { article: ArticleType }) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2">
      {!!article.image && (
        <Image
          src={article.image}
          height={200}
          width={300}
          alt="Article Image"
          className="aspect-[5/2] w-full object-cover"
        />
      )}
      <p className="text-foreground/50 text-sm" suppressHydrationWarning>
        {t(messages.global.placedAt)}: {article.createdAt?.toLocaleString()}
      </p>
      <h1 className="text-xl text-start">{t(article.title)}</h1>

      <p className="whitespace-pre-wrap">{t(article.content).trim()}</p>
    </div>
  );
}
