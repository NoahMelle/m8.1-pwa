import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "./settings";

// Helper function to return a message based on the current language
export const useTranslations = () => {
  const { language } = useLanguage();

  return (path: Record<Locale, string | null>): string => {
    return path[language] ?? "";
  };
};
