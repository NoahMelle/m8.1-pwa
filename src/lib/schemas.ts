import { z } from "zod";

export const favouriteActsSchema = z
  .number()
  .array()
  .transform((arr) => Array.from(new Set(arr)));

export const urgentArticleResSchema = z.object({
  id: z.number(),
  createdAt: z
    .string()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  title: z.object({
    en: z.string(),
    nl: z.string(),
  }),
});
