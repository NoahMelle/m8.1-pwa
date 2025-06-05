import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

const isCI = process.env.CI === "true";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["production", "development", "test"]).optional(),
    DATABASE_URL: isCI
      ? z
          .string()
          .url()
          .optional()
          .default("mysql://root:password@localhost:3306/auth_from_scratch")
      : z.string().url(),
    VAPID_PRIVATE_KEY: isCI
      ? z.string().min(1).default("placeholder_private_key")
      : z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: isCI
      ? z.string().min(1).default("placeholder_public_key")
      : z.string().min(1),
  },

  clientPrefix: "NEXT_PUBLIC",

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
  },
});
