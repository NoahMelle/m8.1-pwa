import Homepage from "@/components/homepage/Homepage";
import Logo from "@/components/Logo";
import Translated from "@/components/reusable/Translated";
import { getLatestUrgentArticle } from "@/lib/fetchers";
import Link from "next/link";

export const dynamic = "force-static";

export default async function Home() {
  const [latestUrgentArticle] = await getLatestUrgentArticle();

  return (
    <div className="w-full h-full flex flex-col justify-center grow">
      <main className="flex flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-2">
          <Logo width={150} height={150} />
          <div className="flex flex-col justify-center">
            <p className="text-4xl font-semibold">Festival</p>
            <p className="text-red text-7xl font-handwritten leading-[70%]">
              2025
            </p>
          </div>
        </div>

        <Homepage />

        {!!latestUrgentArticle && (
          <Link
            className="flex gap-3 items-center"
            href={`/news/${latestUrgentArticle.id}`}
          >
            <span className="relative flex size-2">
              {" "}
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75"></span>{" "}
              <span className="relative inline-flex size-2 rounded-full bg-red"></span>
            </span>
            <p>
              <Translated message={latestUrgentArticle.title} />
            </p>
          </Link>
        )}
      </main>
    </div>
  );
}
