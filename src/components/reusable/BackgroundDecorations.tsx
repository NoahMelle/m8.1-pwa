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
        pathname === "/" ? "" : "opacity-50"
      )}
      key={"background-decoration"}
    ></div>
  );
}
