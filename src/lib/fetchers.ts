"use server";

import { db } from "@/db";
import { performancesTable, stagesTable } from "@/db/schemas";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { and, eq, gte, lt, lte } from "drizzle-orm";
import { groupPerformancesByStage } from "./utils";

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

  const acts = await db
    .select({
      id: performancesTable.id,
      imageUrl: performancesTable.imageUrl,
      title: performancesTable.title,
      startsAt: performancesTable.startsAt,
      endsAt: performancesTable.endsAt,
      stage: {
        name: stagesTable.name,
      },
      description: {
        en: performancesTable.englishDescription,
        nl: performancesTable.dutchDescription,
      },
    })
    .from(performancesTable)
    .where(
      and(
        gte(performancesTable.startsAt, startOfDay),
        lte(performancesTable.startsAt, endOfDay)
      )
    )
    .leftJoin(stagesTable, eq(stagesTable.id, performancesTable.stageId));

  return acts;
}

export async function getGroupedActsForDate(date: "saturday" | "sunday") {
  return groupPerformancesByStage(await getActsForDate(date));
}
