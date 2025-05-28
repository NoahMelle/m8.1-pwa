import ArticleContent from "@/components/news/ArticleContent";
import { getArticleById } from "@/lib/fetchers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);

  const [article] = await getArticleById(id);

  if (!article) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href={"/"}>
          <ArrowLeft />
        </Link>
      </div>
      <ArticleContent article={article} />
    </div>
  );
}
