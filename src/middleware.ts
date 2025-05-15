import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, cookieName } from "./i18n/settings";
import { isLocale } from "./i18n/helpers";
/**
 * Gets the preferred language from the request.
 * @param request The Next request object
 * @returns The preferred language or a fallback language
 */
function getLocale(request: NextRequest): string {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const languageCookie = request.cookies.get(cookieName);
  if (languageCookie?.value && isLocale(languageCookie.value)) {
    return NextResponse.next();
  }

  // Get best language and set it as a cookie
  const lang = getLocale(request);
  request.cookies.set(cookieName, lang);

  return NextResponse.next();
}

// Don't run on internal routes/assets
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icons|offline|manifest.json|fonts|img|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
