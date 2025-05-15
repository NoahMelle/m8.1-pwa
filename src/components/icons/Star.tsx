import Image from "next/image";
import React from "react";

interface StarProps
  extends Omit<
    React.ComponentProps<typeof Image>,
    "width" | "height" | "alt" | "src"
  > {
  filled: boolean;
  width?: number | `${number}`;
  height?: number | `${number}`;
}

export default function Star({ filled, ...props }: StarProps) {
  return (
    <Image
      src={filled ? "/icons/star_filled.svg" : "/icons/star_outline.svg"}
      alt="Star outline"
      width={24}
      height={24}
      className="dark:invert-0 invert"
      {...props}
    />
  );
}
