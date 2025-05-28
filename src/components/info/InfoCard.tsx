import { LucideIcon } from "lucide-react";
import React, { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface InfoCardProps extends HTMLProps<HTMLDivElement> {
  Icon: LucideIcon;
}

export default function InfoCard({ Icon, children, ...props }: InfoCardProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex gap-2 items-center text-white rounded-md p-3 aspect-[16/7]",
        props.className
      )}
    >
      <Icon height={24} width={24} />
      <p>{children}</p>
    </div>
  );
}
