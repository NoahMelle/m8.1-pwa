import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pb-20 grow flex flex-col">{children}</div>;
}
