export const cookieName = "language";
export const locales = ["en", "nl"] as const;
export const defaultLocale = "nl";

export type Locale = (typeof locales)[number];
