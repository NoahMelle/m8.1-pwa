"use client";

import { ArticleType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import React from "react";
import Logo from "../Logo";
import Image from "next/image";
import Link from "next/link";
import Card from "../reusable/Card";

export default function Article({ article }: { article: ArticleType }) {
  const t = useTranslations();

  return (
    <Card className="relative items-center aspect-[3/4] shrink-0 w-[200px] grid grid-cols-1 grid-rows-[3fr_1fr] overflow-hidden p-0">
      <Link
        href={`/news/${article.id}`}
        className="absolute h-full w-full top-0 left-0"
      ></Link>
      <div className="h-full min-h-0 bg-foreground/10">
        {article.image ? (
          <Image
            src={article.image}
            alt="Article Image"
            height={200}
            width={200}
            className="object-cover rounded-sm h-full"
          />
        ) : (
          <Logo height={200} width={200} className="object-cover h-full" />
        )}
      </div>
      <div className="p-2 h-full">
        <span className="text-base mb-0 font-normal line-clamp-2 not-italic">
          {t(article.title)}
        </span>
      </div>
    </Card>
  );
}
