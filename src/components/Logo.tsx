"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Logo({
  width,
  height,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  const { theme } = useTheme();

  return (
    <Image
      width={width}
      height={height}
      {...props}
      alt="Logo"
      src={`/logo/logo_${theme === "dark" ? "black" : "white"}.png`}
      key={theme}
    />
  );
}
