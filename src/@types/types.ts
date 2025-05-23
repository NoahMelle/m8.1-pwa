import {
  getActsForDate,
  getAllArticles,
  getAllGenres,
  getLatestUrgentArticle,
  getPerformances,
  getStages,
} from "@/lib/fetchers";

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
export type UrgentArticleType = Awaited<
  ReturnType<typeof getLatestUrgentArticle>
>[0];
