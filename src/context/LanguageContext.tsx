"use client";

import { cookieName, Locale } from "@/i18n/settings";
import { setCookie } from "cookies-next/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type LanguageContextType = {
  language: Locale;
  setLanguage: Dispatch<SetStateAction<Locale>>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Make sure the type is not undefined
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({
  initialLanguage,
  children,
}: {
  initialLanguage: Locale;
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState(initialLanguage);

  // Save preferred language in a cookie on save
  useEffect(() => {
    setCookie(cookieName, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
