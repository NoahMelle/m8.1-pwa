import React, { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, "type"> {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={twMerge("w-full", className)} {...props}>
      {children}
    </button>
  );
}
