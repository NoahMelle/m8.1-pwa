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
    <Card className="shrink-0 w-[200px] p-0 overflow-hidden">
      <Link href={`/news/${article.id}`} className="block h-full">
        <span className="w-full block min-h-0 bg-foreground/10 aspect-square">
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
        </span>
        <span className="overflow-hidden p-4 block">
          <span className="text-base mb-0 font-normal h-fit line-clamp-2 overflow-hidden break-all">
            {t(article.title)}
          </span>
        </span>
      </Link>
    </Card>
  );
}
