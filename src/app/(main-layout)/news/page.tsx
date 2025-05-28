import React from "react";
import { nanoid } from "nanoid";
import ArticleBlock from "@/components/news/ArticleBlock";
import { getAllArticles } from "@/lib/fetchers";
import Article from "@/components/news/Article";

export default async function News() {
  const articles = await getAllArticles();

  return (
    <>
      <h1>News</h1>
      <div className="grid grid-cols-2 grid-rows-[auto_auto] sm:grid-rows-1 sm:grid-cols-3 gap-2">
        {articles.map((article, index) =>
          index >= 3 ? null : (
            <ArticleBlock
              key={nanoid()}
              article={article}
              className={index === 0 ? "col-span-full sm:col-span-1" : ""}
            />
          )
        )}
      </div>

      <div className="flex flex-col border-foreground/10 gap-4">
        {articles.map((article) => (
          <Article key={nanoid()} article={article} />
        ))}
      </div>
    </>
  );
}
