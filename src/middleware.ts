import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, cookieName } from "./i18n/settings";

function isLocale(value: string): value is (typeof locales)[number] {
  return (locales as readonly string[]).includes(value);
}

function getLocale(request: NextRequest) {
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

  const lang = getLocale(request);
  request.cookies.set(cookieName, lang);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icons|fonts|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
