import { cookies } from "next/headers";
import { getLocaleFromCookies } from "./helpers";
import { Locale } from "./settings";

export const getServerSideTranslations = async () => {
  "use server";

  const cookieStore = await cookies();
  const language = getLocaleFromCookies(cookieStore);

  return (path: Record<Locale, string>): string => {
    return language ? path[language] : "";
  };
};
