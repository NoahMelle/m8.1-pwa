"use client";

import { cookieName, locales } from "@/i18n/settings";
import { setCookie } from "cookies-next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type LanguageContextType = {
  language: (typeof locales)[number];
  setLanguage: Dispatch<SetStateAction<(typeof locales)[number]>>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

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
  initialLanguage: (typeof locales)[number];
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    setCookie(cookieName, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
