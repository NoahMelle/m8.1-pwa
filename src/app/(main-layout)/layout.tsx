import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-20 grow flex flex-col">
      <div className="px-4 py-12 flex flex-col gap-8 grow">{children}</div>
    </div>
  );
}
