import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-console": ["error"],
      "no-warning-comments": ["error"]
    },
    ignores: ["db/seed.ts", "cron-jobs/**"]
  }
];

export default eslintConfig;
