"use client";

import { ArticleType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import Link from "next/link";
import React from "react";
import Logo from "../Logo";

export default function Article({ article }: { article: ArticleType }) {
  const t = useTranslations();

  return (
    <Link
      className="flex gap-2 items-center border-b py-2 border-foreground/10"
      href={`/news/${article.id}`}
    >
      <Logo
        height={50}
        width={50}
        className="aspect-square object-cover rounded-sm"
      />
      <span className="text-base mb-0 font-normal">{t(article.title)}</span>
    </Link>
  );
}
