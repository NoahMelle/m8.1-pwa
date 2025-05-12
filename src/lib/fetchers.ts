"use server";

import { db } from "@/db";
import { performancesTable } from "@/db/schemas";
import { and, eq, gte, lt } from "drizzle-orm";

export async function getStages() {
  const stages = await db.query.stagesTable.findMany();

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
