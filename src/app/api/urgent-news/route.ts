import { getLatestUrgentArticle } from "@/lib/fetchers";

export async function GET() {
  const data = await getLatestUrgentArticle();

  if (!data[0]) {
    return Response.json(
      { message: "No news items available" },
      { status: 404 }
    );
  }

  return Response.json({ data: data[0] }, { status: 200 });
}
