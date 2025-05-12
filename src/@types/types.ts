import { getPerformances, getStages } from "@/lib/fetchers";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export type StageType = Awaited<ReturnType<typeof getStages>>[0];
export type PerformanceType = Awaited<ReturnType<typeof getPerformances>>[0];
