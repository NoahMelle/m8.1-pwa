"use server";

import { db } from "@/db";
import {
  articlesTable,
  genresTable,
  performancesTable,
  stagesTable,
} from "@/db/schemas";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { and, eq, gte, lt, lte } from "drizzle-orm";
import { groupPerformancesByStage } from "./utils";
import { formatDatabaseEntryToLocales } from "@/i18n/helpers";

export async function getStages() {
  const stages = await db
    .select({
      id: stagesTable.id,
      name: stagesTable.name,
      description: {
        en: stagesTable.englishDescription,
        nl: stagesTable.dutchDescription,
      },
      xPosition: stagesTable.xPosition,
      yPosition: stagesTable.yPosition,
    })
    .from(stagesTable);

  return stages;
}

export async function getPerformances() {
  const performances = await db.query.performancesTable.findMany();

  return performances;
}

export async function getNextActForStage(stageId: number) {
  const nextAct = await db
    .select()
    .from(performancesTable)
    .where(
      and(
        gte(performancesTable.startsAt, new Date()),
        eq(performancesTable.stageId, stageId)
      )
    )
    .orderBy(performancesTable.startsAt)
    .limit(1);

  return nextAct.length === 1 ? nextAct[0] : null;
}

export async function getCurrentActForStage(stageId: number) {
  const currentAct = await db
    .select()
    .from(performancesTable)
    .where(
      and(
        gte(performancesTable.endsAt, new Date()),
        lt(performancesTable.startsAt, new Date()),
        eq(performancesTable.stageId, stageId)
      )
    )
    .orderBy(performancesTable.startsAt)
    .limit(1);

  return currentAct.length === 1 ? currentAct[0] : null;
}

export async function getActsForDate(date: "saturday" | "sunday") {
  dayjs.extend(utc);
  const day = dayjs.utc(date === "saturday" ? "2025-09-06" : "2025-09-07");

  const startOfDay = day.startOf("day").toDate();
  const endOfDay = day.endOf("day").toDate();

  const acts = await db.query.performancesTable.findMany({
    columns: {
      id: true,
      imageUrl: true,
      videoUrl: true,
      title: true,
      startsAt: true,
      endsAt: true,
      englishDescription: true,
      dutchDescription: true,
    },
    where: and(
      gte(performancesTable.startsAt, startOfDay),
      lte(performancesTable.startsAt, endOfDay)
    ),
    with: {
      stage: {
        columns: {
          id: true,
          name: true,
        },
      },
      genres: {
        with: {
          genre: true,
        },
      },
    },
  });

  return acts.map((act) =>
    formatDatabaseEntryToLocales(act, "description", {
      englishTranslationKey: "englishDescription",
      dutchTranslationKey: "dutchDescription",
    })
  );
}

export async function getGroupedActsForDate(date: "saturday" | "sunday") {
  return groupPerformancesByStage(
    await getActsForDate(date),
    await getStages()
  );
}

export async function getAllGenres() {
  return await db
    .select({
      name: genresTable.name,
      id: genresTable.id,
    })
    .from(genresTable);
}

export async function getAllArticles() {
  return await db
    .select({
      createdAt: articlesTable.createdAt,
      title: {
        en: articlesTable.englishTitle,
        nl: articlesTable.dutchTitle,
      },
      content: {
        en: articlesTable.englishContent,
        nl: articlesTable.dutchContent,
      },
      image: articlesTable.image,
    })
    .from(articlesTable);
}
