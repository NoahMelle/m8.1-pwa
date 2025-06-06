import React from "react";

export default function TopBarButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-fit flex p-2 justify-center aspect-square active:scale-90 transition-transform"
    >
      <span className="h-6 overflow-hidden rounded-full">{children}</span>
    </button>
  );
}
