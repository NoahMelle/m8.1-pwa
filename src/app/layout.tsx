import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/app.scss";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/global/TopBar";
import { LanguageProvider } from "@/context/LanguageContext";
import { getLocaleFromCookies } from "@/i18n/helpers";
import { ThemeProvider } from "@/context/ThemeContext";
import { isTheme } from "@/lib/utils";
import ServiceWorker from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "LoveU Festival App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const themeCookie = cookieStore.get("theme")?.value || "system";
  const theme = themeCookie && isTheme(themeCookie) ? themeCookie : "system";

  const language = getLocaleFromCookies(cookieStore);

  return (
    <html lang={language} suppressHydrationWarning className={theme}>
      <body>
        <ThemeProvider initialTheme={theme}>
          <LanguageProvider initialLanguage={language}>
            <TopBar />
            <main className={"grow flex flex-col"}>{children}</main>
            <Navbar />
            <ServiceWorker />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
