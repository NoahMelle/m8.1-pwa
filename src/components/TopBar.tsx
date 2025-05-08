"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { useLanguage } from "./context/LanguageContext";

export default function TopBar() {
  const { setTheme } = useTheme();
  const { setLanguage, language } = useLanguage();

  return (
    <div className="sticky top-0 w-full dark:bg-black/30 bg-white/30 backdrop-blur-lg flex justify-end">
      <button
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className="red-gradient bg-gradient-to-b text-white rounded-md w-fit flex p-4 justify-center aspect-square"
      >
        <span className="h-6 overflow-hidden">
          <span className="dark:-translate-y-1/2 block transition-all dark:invert-0 invert">
            <Image
              src={"/icons/dark_mode.svg"}
              alt="Theme Toggle"
              width={24}
              height={24}
            />
            <Image
              src={"/icons/light_mode.svg"}
              alt="Theme Toggle"
              width={24}
              height={24}
            />
          </span>
        </span>
      </button>
      <button
        onClick={() => setLanguage((prev) => (prev === "en" ? "nl" : "en"))}
        className="red-gradient bg-gradient-to-b text-white rounded-md w-fit flex p-4 justify-center aspect-square"
      >
        <span className="h-6 overflow-hidden rounded-full">
          <span
            className={`${
              language === "nl" ? "-translate-y-1/2" : ""
            } block transition-all`}
          >
            <Image
              src={"/icons/dutch_flag.png"}
              alt="Dutch Flag"
              width={24}
              height={24}
              className="block w-6 h-6 object-cover"
            />
            <Image
              src={"/icons/english_flag.png"}
              alt="English Flag"
              width={24}
              className="block w-6 h-6 object-cover"
              height={24}
            />
          </span>
        </span>
      </button>
    </div>
  );
}
