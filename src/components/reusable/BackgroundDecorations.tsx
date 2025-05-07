import React from "react";
import { twMerge } from "tailwind-merge";

export default function BackgroundDecorations(
  props: React.HTMLProps<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={twMerge(
        "h-full w-full absolute top-0 left-0 -z-10 gradient-background",
        props.className
      )}
    ></div>
  );
}
