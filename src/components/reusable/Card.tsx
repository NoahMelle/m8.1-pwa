import React, { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "dark:bg-neutral-800/50 bg-white/30 backdrop-blur-lg rounded-lg p-4 border dark:border-white/20 border-black/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
