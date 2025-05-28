import Article from "@/components/news/Article";
import Translated from "@/components/reusable/Translated";
import { messages } from "@/i18n/messages";
import {
  getAllArticles,
  getCurrentActForStage,
  getStages,
} from "@/lib/fetchers";
import { nanoid } from "nanoid";
import Image from "next/image";

export default async function Home() {
  const articles = await getAllArticles();

  const stages = await getStages();

  const currentlyPlaying = await Promise.all(
    stages.map((stage) => getCurrentActForStage(stage.id))
  );

  return (
    <>
      <h1>
        <Translated message={messages.homepage.heading} />
      </h1>

      <section className="flex flex-col gap-2">
        <div className="w-full text-left">
          <h2 className="mb-0">
            <Translated message={messages.news.heading} />
          </h2>
        </div>
        <div className="overflow-x-auto w-full">
          <div className="flex border-foreground/10 gap-4 w-fit">
            {articles.map((article) => (
              <Article key={nanoid()} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="w-full text-left">
          <h2 className="mb-0">
            <Translated message={messages.map.popup.currentAct} />s
          </h2>
        </div>
        <div className="w-full gap-2 flex flex-col">
          {stages.map((stage, index) => (
            <div
              key={nanoid()}
              className=" rounded-xl p-4 border-foreground/10 border grid grid-cols-[1fr_3fr] gap-4 bg-background"
            >
              <div>
                <Image
                  className="aspect-square object-cover rounded-full"
                  src={`/img/stages/${stage.name
                    .toLocaleLowerCase()
                    .replaceAll(" ", "-")}.png`}
                  alt={stage.name}
                  width={70}
                  height={70}
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <h3>{stage.name}</h3>
                <p className="text-foreground/50">
                  {" "}
                  {currentlyPlaying[index] ? (
                    currentlyPlaying[index].title
                  ) : (
                    <Translated message={messages.map.popup.noCurrent} />
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
