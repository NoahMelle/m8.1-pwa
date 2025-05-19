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
      <div className="grid grid-cols-2 grid-rows-2 aspect-video gap-2">
        {articles.map((article, index) => (
          <ArticleBlock
            key={nanoid()}
            article={article}
            className={index === 0 ? "col-span-full" : ""}
          />
        ))}
      </div>
      <div className="flex flex-col border-t-2 border-foreground/10">
        {articles.map((article) => (
          <Article key={nanoid()} article={article} />
        ))}
      </div>
    </>
  );
}
