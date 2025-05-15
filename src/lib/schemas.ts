import { z } from "zod";

export const favouriteActsSchema = z
  .number()
  .array()
  .transform((arr) => Array.from(new Set(arr)));
