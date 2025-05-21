"use client";

import { ArticleType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import Image from "next/image";
import clsx from "clsx";
import React, { HTMLProps } from "react";
import Link, { LinkProps } from "next/link";

type ArticleProps = Partial<LinkProps> &
  HTMLProps<HTMLAnchorElement> & {
    article: ArticleType;
  };

export default function ArticleBlock({ article, ...props }: ArticleProps) {
  const t = useTranslations();

  return (
    <Link
      {...props}
      className={clsx(
        "relative rounded-sm overflow-hidden p-2 flex flex-col justify-end text-white bg-red",
        props.className
      )}
      href={`/news/${article.id}`}
    >
      {article.image && (
        <>
          <Image
            src={article.image}
            alt={t(article.title)}
            className="absolute w-full h-full object-cover z-0"
            fill
          />
          <span className="absolute h-full w-full top-0 left-0 bg-gradient-to-b to-black/50"></span>
        </>
      )}
      <span className="relative">
        <span className="mb-0 text-shadow-lg">{t(article.title)}</span>
      </span>
    </Link>
  );
}
