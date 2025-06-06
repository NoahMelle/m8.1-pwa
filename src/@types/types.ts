import { LocalizedString } from "@/i18n/messages";
import {
  getActsForDate,
  getAllArticles,
  getAllGenres,
  getPerformances,
  getStages,
} from "@/lib/fetchers";
import { LucideIcon } from "lucide-react";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export type DayType = "saturday" | "sunday";

export type StageType = Awaited<ReturnType<typeof getStages>>[0];
export type PerformanceType = Awaited<ReturnType<typeof getPerformances>>[0];
export type PerformanceWithStageType = Awaited<
  ReturnType<typeof getActsForDate>
>[0];
export type GenreType = Awaited<ReturnType<typeof getAllGenres>>[0];
export type ArticleType = Awaited<ReturnType<typeof getAllArticles>>[0];
export interface TransportOption {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  image: LucideIcon;
}
