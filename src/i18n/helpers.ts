import { cookieName, defaultLocale, Locale, locales } from "./settings";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

/**
 * Checks whether the string is inside of the 'locales' array
 * @param value The string you want to check
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Gets the 'lang' cookie and checks if it's a valid locale. If not, it will default to the default locale.
 * @param cookieStore The cookies, as returned by cookies() from 'next/headers'
 */
export function getLocaleFromCookies(
  cookieStore: ReadonlyRequestCookies
): Locale {
  const languageCookie = cookieStore.get(cookieName)?.value;
  const language =
    languageCookie && isLocale(languageCookie) ? languageCookie : defaultLocale;

  return language;
}

export function formatDatabaseEntryToLocales<
  T extends Record<string, TVal>,
  TVal,
  NewKey extends string,
  EnglishKey extends keyof T,
  DutchKey extends keyof T
>(
  entry: T,
  newKeyname: NewKey,
  {
    englishTranslationKey,
    dutchTranslationKey,
  }: { englishTranslationKey: EnglishKey; dutchTranslationKey: DutchKey }
): Omit<T, EnglishKey | DutchKey> & {
  [K in NewKey]: {
    en: T[EnglishKey];
    nl: T[DutchKey];
  };
} {
  const {
    [englishTranslationKey]: enValue,
    [dutchTranslationKey]: nlValue,
    ...rest
  } = entry;

  return {
    ...rest,
    [newKeyname]: {
      nl: nlValue,
      en: enValue,
    },
  } as Omit<T, EnglishKey | DutchKey> & {
    [K in NewKey]: {
      en: T[EnglishKey];
      nl: T[DutchKey];
    };
  };
}
