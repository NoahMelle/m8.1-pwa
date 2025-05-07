"use client";

import Image from "next/image";
import React from "react";
import ThemeMountWrapper from "./reusable/ThemeMountWrapper";
import { useTheme } from "next-themes";

export default function Logo({
  width,
  height,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  const { theme } = useTheme();

  return (
    <ThemeMountWrapper>
      <Image
        width={width}
        height={height}
        {...props}
        alt="Logo"
        src={`/logo/logo_${theme === "dark" ? "black" : "white"}.png`}
        key={theme}
      />
    </ThemeMountWrapper>
  );
}
