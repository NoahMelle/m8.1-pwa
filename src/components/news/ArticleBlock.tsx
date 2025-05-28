"use client";

import { ArticleType } from "@/@types/types";
import { useTranslations } from "@/i18n/useTranslations";
import Image from "next/image";
import clsx from "clsx";
import React, { HTMLProps } from "react";
import Link, { LinkProps } from "next/link";
import Logo from "../Logo";

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
        "relative rounded-md overflow-hidden min-h-20 grid grid-cols-1 aspect-video shadow bg-background dark:border border-foreground/20 grid-rows-[1fr_min-content]",
        props.className
      )}
      href={`/news/${article.id}`}
    >
      <span className="block w-full h-full min-h-0 bg-background relative p-2">
        {article.urgence && (
          <span className="bg-red w-fit text-xs rounded-full px-2 text-white shadow not-italic py-1 z-10 relative">
            Urgent
          </span>
        )}
        <span className="bg-gradient-to-b to-black/10 w-full absolute h-full top-0 left-0 z-[1]"></span>
        {article.image ? (
          <Image
            src={article.image}
            alt={t(article.title)}
            className="w-full h-full object-cover block top-0 left-0 z-[-1]"
            fill
          />
        ) : (
          <Logo fill className="object-contain w-full h-full top-0 left-0" />
        )}
      </span>
      {/* <span
        className={`absolute h-full w-full top-0 left-0 from-black/5 bg-gradient-to-b to-black/50 z-0`}
      ></span> */}
      <span className="relative not-italic flex flex-col  font-semibold max-w-full p-2 min-h-full">
        <span className="mb-0 truncate">{t(article.title)}</span>
      </span>
    </Link>
  );
}
