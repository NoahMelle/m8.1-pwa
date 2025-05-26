import React from "react";

export default function LocationPopupCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3>{title}:</h3>

      <div className="relative aspect-square overflow-hidden flex flex-col justify-between dark:bg-neutral-800/50 bg-white/30 backdrop-blur-lg rounded-lg p-4 border dark:border-white/20 border-black/10 shadow-sm">
        <div className="flex flex-col justify-end h-full">
          <div className="bg-gradient-to-b from-transparent to-black/60 absolute top-0 left-0 w-full h-full"></div>

          {children}
        </div>
      </div>
    </div>
  );
}
