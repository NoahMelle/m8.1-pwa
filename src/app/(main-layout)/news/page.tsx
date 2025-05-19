import React from "react";
import { nanoid } from "nanoid";
import Article from "@/components/news/Article";
import { getAllArticles } from "@/lib/fetchers";

export default async function News() {
  const articles = await getAllArticles();

  return (
    <div>
      <h1>News</h1>
      <div>
        {articles.map((article) => (
          <Article key={nanoid()} article={article} />
        ))}
      </div>
    </div>
  );
}
