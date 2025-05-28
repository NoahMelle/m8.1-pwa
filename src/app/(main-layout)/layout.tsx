import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow flex flex-col">
      <div className="px-6 py-12 flex flex-col gap-8 grow">{children}</div>
    </div>
  );
}
