import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow flex flex-col pb-20">
      <div className="px-6 py-12 flex flex-col gap-8 grow">{children}</div>
      <div className="fixed bg-gradient-to-b to-background h-32 bottom-0 w-full left-0"></div>
    </div>
  );
}
