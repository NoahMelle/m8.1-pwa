"use client";

import { ArticleType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Article({ article }: { article: ArticleType }) {
  const t = useTranslations();

  return (
    <Link
      className="flex gap-2 items-center border-b-2 py-2 border-foreground/10"
      href={`/news/${article.id}`}
    >
      <Image
        src={article.image ?? "/logo/logo_black.png"}
        alt="Article Image"
        height={50}
        width={50}
        className="aspect-square object-cover rounded-sm"
      />
      <span className="text-base mb-0 font-normal">{t(article.title)}</span>
    </Link>
  );
}
