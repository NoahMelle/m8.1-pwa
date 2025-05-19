import { LucideIcon } from "lucide-react";
import React from "react";
import { KeepScale } from "react-zoom-pan-pinch";

export interface MarkerProps {
  Icon: LucideIcon;
  position: {
    xPosition: number;
    yPosition: number;
  };
}

export default function Marker({
  Icon,
  position,
  scale,
}: MarkerProps & { scale: number }) {
  return (
    <KeepScale
      style={{
        left: `${position.xPosition}%`,
        top: `${position.yPosition}%`,
      }}
      className={`absolute -translate-1/2 z-[1] ${
        scale > 2 ? "block" : "hidden"
      }`}
    >
      <div className="h-6 w-6 flex items-center justify-center rounded-full bg-red border-red-700 dark:bg-red-700 dark:border-red-800 border-2">
        <Icon height={12} width={12} />
      </div>
    </KeepScale>
  );
}
