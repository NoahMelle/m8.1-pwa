"use client";

import { Theme } from "@/@types/theme";
import { setCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "dark" | "light" | "system";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Make sure the type is not undefined
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">(initialTheme);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  // Save preferred language in a cookie on save
  useEffect(() => {
    setCookie("theme", theme);
    document.documentElement.classList = theme;
  }, [theme]);

  useEffect(() => {
    if (
      theme === "system" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
