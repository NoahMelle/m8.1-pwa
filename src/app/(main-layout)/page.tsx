import CurrentActs from "@/components/homepage/CurrentActs";
import Article from "@/components/news/Article";
import Translated from "@/components/reusable/Translated";
import { messages } from "@/i18n/messages";
import {
  getAllArticles,
  getCurrentActForStage,
  getStages,
} from "@/lib/fetchers";
import { nanoid } from "nanoid";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function Home() {
  const articles = await getAllArticles();

  const stages = await getStages();

  const currentlyPlaying = await Promise.all(
    stages.map((stage) => getCurrentActForStage(stage.id))
  );

  return (
    <>
      <h1>
        <Translated message={messages.homepage.heading} />{" "}
        <span className="text-red">LoveU!</span>
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
        <div className="w-full flex justify-between">
          <h2 className="mb-0">
            <Translated message={messages.map.popup.currentAct} />s
          </h2>
          <Link
            href={"/timetable"}
            className="not-italic bg-blue flex gap-1 items-center justify-center px-4 rounded-full text-white font-normal"
          >
            Timetable
            <ArrowUpRight width={20} height={20} />
          </Link>
        </div>
        <CurrentActs stages={stages} currentlyPlaying={currentlyPlaying} />
      </section>
    </>
  );
}
