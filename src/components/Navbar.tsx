"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface Link {
  url: string;
  text: string;
  iconUrl: string;
}

export default function Navbar() {
  const [highlightPosition, setHighlightPosition] = React.useState(0);
  const [highlightWidth, setHighlightWidth] = React.useState(0);
  const highlightContainerRef = React.useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const activeLink = highlightContainerRef.current?.querySelector(
      ".active"
    ) as HTMLElement;

    if (activeLink) {
      const containerWidth = highlightContainerRef.current?.clientWidth || 0;
      const linkWidth = activeLink.clientWidth;
      const linkOffsetLeft = activeLink.offsetLeft;

      setHighlightWidth(linkWidth);

      setHighlightPosition((linkOffsetLeft / containerWidth) * 100);
    }
  }, [pathname]);

  const links: Link[] = [
    {
      url: "/",
      text: "Home",
      iconUrl: "/icons/home.svg",
    },
    {
      url: "/info",
      text: "Info",
      iconUrl: "/icons/info.svg",
    },
    {
      url: "/weather",
      text: "Weather",
      iconUrl: "/icons/cloud.svg",
    },
    {
      url: "/map",
      text: "Map",
      iconUrl: "/icons/location.svg",
    },
    {
      url: "/timetable",
      text: "Time table",
      iconUrl: "/icons/time.svg",
    },
    {
      url: "/settings",
      text: "Settings",
      iconUrl: "/icons/settings.svg",
    },
  ];

  return (
    <div className="fixed bottom-4 w-full px-2">
      <nav
        className="bg-red rounded-full p-1 h-12 flex relative"
        ref={highlightContainerRef}
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.url}
            className={`flex grow relative z-10 items-center justify-center gap-2 h-full active:scale-90 ${
              pathname === link.url ? "text-black rounded-full active" : ""
            }`}
          >
            <Image
              src={link.iconUrl}
              className={`${
                pathname === link.url ? "invert" : ""
              } transition-all`}
              alt={link.text}
              width={24}
              height={24}
            />
          </Link>
        ))}
        <div className="absolute py-1 w-full h-full left-0 top-0 pointer-events-none">
          <div className="relative h-full w-full">
            <div
              className="absolute bg-white rounded-full transition-all duration-300 ease-in-out h-full"
              style={{
                left: `${highlightPosition}%`,
                width: `${highlightWidth}px`,
                height: "100%",
              }}
            ></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
