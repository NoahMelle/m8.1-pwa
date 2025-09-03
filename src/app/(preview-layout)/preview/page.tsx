"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Preview() {
  const router = useRouter();

  useEffect(() => {
    const isOnMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isOnMobile) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="p-8 w-full h-screen flex justify-center items-center bg-foreground/5 flex-col gap-4">
      <div className="aspect-[607/1268] relative h-full">
        <Image
          src={"/img/phone-mockup.png"}
          alt="Mockup of a phone"
          fill
          className="pointer-events-none"
        />
        <iframe
          src="/"
          className="w-full h-full p-5  rounded-[75px] overflow-hidden"
        ></iframe>
      </div>
      <p>
        WARNING: this is a mockup, for the actual application, visit{" "}
        <Link href="/" className="underline">
          this link
        </Link>
        .
      </p>
    </div>
  );
}
