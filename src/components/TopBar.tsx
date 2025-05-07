"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import ThemeMountWrapper from "./reusable/ThemeMountWrapper";

export default function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 w-full">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="red-gradient bg-gradient-to-b text-white rounded-md w-full flex justify-center p-4"
      >
        <ThemeMountWrapper>
          <Image
            key={theme}
            src={
              theme === "dark"
                ? "/icons/dark_mode.svg"
                : "/icons/light_mode.svg"
            }
            className={theme === "light" ? "invert" : ""}
            alt="Theme Toggle"
            width={24}
            height={24}
          />
        </ThemeMountWrapper>
      </button>
    </div>
  );
}
