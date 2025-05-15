"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log(`Scope is: ${registration.scope}`));
    }
  }, []);

  return null;
}
