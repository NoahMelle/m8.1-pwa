import { useLanguage } from "@/components/context/LanguageContext";
import { locales } from "./settings";

export const useTranslations = () => {
  const lang = useLanguage();

  const language = lang?.language;

  return (path: Record<(typeof locales)[number], string>): string => {
    return language ? path[language] : "";
  };
};
