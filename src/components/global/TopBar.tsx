"use client";

import Image from "next/image";
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import TopBarButton from "./TopBarButton";

export default function TopBar() {
  const { language, toggleLanguage } = useLanguage();
  const { toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname === "/map" ? "fixed" : "sticky"
      } top-0 w-full flex justify-end p-2 z-10`}
    >
      <TopBarButton onClick={toggleTheme}>
        <span className="dark:-translate-y-1/2 block transition-all">
          <Moon width={24} height={24} />
          <Sun width={24} height={24} />
        </span>
      </TopBarButton>
      <TopBarButton onClick={toggleLanguage}>
        <span
          className={`${
            language === "en" ? "-translate-y-1/2" : ""
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
      </TopBarButton>
    </div>
  );
}
