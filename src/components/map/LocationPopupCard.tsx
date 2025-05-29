import React from "react";
import Card from "../reusable/Card";

export default function LocationPopupCard({
  title,
  children,
  hasOverlay = true,
}: {
  title: string;
  children: React.ReactNode;
  hasOverlay?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3>{title}:</h3>

      <Card
        className={`relative aspect-square overflow-hidden flex flex-col justify-between ${
          hasOverlay ? "text-white" : "text-foreground"
        }`}
      >
        <div className="flex flex-col justify-end h-full">
          {hasOverlay && (
            <div className="bg-gradient-to-b from-transparent to-black/60 absolute top-0 left-0 w-full h-full"></div>
          )}

          {children}
        </div>
      </Card>
    </div>
  );
}
