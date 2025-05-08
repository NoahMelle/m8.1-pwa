import { useLanguage } from "@/components/context/LanguageContext";
import { Locale } from "./settings";

// Helper function to return a message based on the current language
export const useTranslations = () => {
  const { language } = useLanguage();

  return (path: Record<Locale, string>): string => {
    return language ? path[language] : "";
  };
};
