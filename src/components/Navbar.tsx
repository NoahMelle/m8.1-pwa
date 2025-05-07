"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Link {
  url: string;
  text: string;
  iconUrl: string;
}

export default function Navbar() {
  const pathname = usePathname();

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
      <nav className="from-red to-red-600 bg-gradient-to-b rounded-full p-1 h-12 flex gap-2">
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.url}
            className={`flex items-center gap-2 h-full ${
              pathname === link.url
                ? "bg-white grow text-black rounded-full px-3"
                : "aspect-square justify-center"
            }`}
          >
            <Image
              src={link.iconUrl}
              className={pathname === link.url ? "invert" : ""}
              alt={link.text}
              width={24}
              height={24}
            />
            {link.url === pathname && link.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}
