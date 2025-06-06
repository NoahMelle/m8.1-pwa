"use client";

import { Home, Info, LucideIcon, MapPin, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface Link {
  url: string;
  text: string;
  iconUrl: LucideIcon;
  possibleUrls?: string[];
}

export default function Navbar() {
  const [highlightPosition, setHighlightPosition] = React.useState<
    number | null
  >(null);
  const [highlightWidth, setHighlightWidth] = React.useState<number | null>(
    null
  );
  const highlightContainerRef = React.useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  function handlePathnameChange() {
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
  }

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", handlePathnameChange);

    return () => {
      window.removeEventListener("resize", handlePathnameChange);
    };
  }, []);

  const links: Link[] = [
    {
      url: "/",
      text: "Home",
      iconUrl: Home,
      possibleUrls: ["/news"],
    },
    {
      url: "/info",
      text: "Info",
      iconUrl: Info,
    },
    {
      url: "/map",
      text: "Map",
      iconUrl: MapPin,
    },
    {
      url: "/timetable",
      text: "Time table",
      iconUrl: SquareChartGantt,
    },
  ];

  return (
    <div className="fixed bottom-4 w-full px-2 z-10 isolate">
      <nav
        className="bg-red rounded-full p-1 h-12 flex relative"
        ref={highlightContainerRef}
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.url}
            className={`flex grow relative items-center z-20 justify-center gap-2 h-full active:scale-90 ${
              pathname === link.url ||
              link.possibleUrls?.some((url) => pathname.startsWith(url))
                ? "text-black rounded-full active"
                : ""
            }`}
            aria-label={link.text}
          >
            <link.iconUrl
              width={24}
              height={24}
              color={
                pathname === link.url ||
                link.possibleUrls?.some((url) => pathname.startsWith(url))
                  ? "black"
                  : "white"
              }
            />
          </Link>
        ))}
        {/* Current page indicator */}
        <div className="absolute py-1 w-full h-full left-0 top-0 pointer-events-none">
          <div className="relative h-full w-full">
            <div
              className="absolute bg-white rounded-full transition-all duration-300 z-10 ease-in-out h-full"
              style={{
                left: `${highlightPosition ?? 0}%`,
                width: `${highlightWidth ?? 0}px`,
                height: "100%",
              }}
            ></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
