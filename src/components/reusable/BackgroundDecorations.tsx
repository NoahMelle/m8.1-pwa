"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function BackgroundDecorations(
  props: React.HTMLProps<HTMLDivElement>
) {
  const pathname = usePathname();

  return (
    <div
      {...props}
      className={twMerge(
        "h-full w-full fixed top-0 left-0 -z-10 gradient-background transition-opacity duration-1000",
        props.className,
        pathname === "/"
          ? "dark:opacity-40 opacity-80"
          : "opacity-50 dark:opacity-20"
      )}
      key={"background-decoration"}
    ></div>
  );
}
