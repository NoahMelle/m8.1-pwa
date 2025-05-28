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
        "dark:bg-foreground/10 bg-foreground/5 backdrop-blur-lg rounded-lg p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
