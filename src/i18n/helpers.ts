import { Locale, locales } from "./settings";

/**
 * Checks whether the string is inside of the 'locales' array
 * @param value The string you want to check
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
