import { Theme, themes } from "@/@types/theme";

/**
 * Checks whether the string is inside of the 'themes' array
 * @param value The string you want to check
 */
export function isTheme(value: string): value is Theme {
  return (themes as readonly string[]).includes(value);
}
