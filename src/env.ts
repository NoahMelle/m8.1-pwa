import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["production", "development", "test"]).optional(),
    DATABASE_URL: z.string().url(),
    VAPID_PRIVATE_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string().min(1),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  },
});
