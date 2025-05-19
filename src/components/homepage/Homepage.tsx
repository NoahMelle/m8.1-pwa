"use client";

import { UrgentArticleType } from "@/@types/types";
import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import { urgentArticleResSchema } from "@/lib/schemas";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [latestUrgentArticle, setLastestUrgentArticle] =
    useState<UrgentArticleType | null>(null);

  const t = useTranslations();

  useEffect(() => {
    getLatestUrgentArticle();
  }, []);

  async function getLatestUrgentArticle() {
    try {
      const res = await fetch("/api/urgent-news", { cache: "no-cache" });
      const data = await res.json();

      const parsedData = urgentArticleResSchema.parse(data.data);
      setLastestUrgentArticle(parsedData);
    } catch {
      setLastestUrgentArticle(null);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center w-full px-4 max-w-[350px] mx-auto">
        <Link
          href={"/info"}
          className="bg-red active:scale-[98%] transition-transform text-white rounded-lg w-full flex justify-center p-4"
        >
          {t(messages.homepage.about)}
        </Link>
        <Link
          href={"/timetable"}
          className="border-red border-2 active:scale-[98%] transition-transform rounded-lg w-full flex justify-center p-4"
        >
          {t(messages.homepage.timetable)}
        </Link>
      </div>
      {!!latestUrgentArticle && (
        <Link
          className="flex gap-3 items-center"
          href={`/news/${latestUrgentArticle.id}`}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75"></span>{" "}
            <span className="relative inline-flex size-2 rounded-full bg-red"></span>
          </span>
          <p>{t(latestUrgentArticle.title)}</p>
        </Link>
      )}
    </>
  );
}
