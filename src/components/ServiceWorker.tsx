"use client";

import { env } from "@/env";
import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        return Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            });
          }
        });
      });
    }
  }, []);

  return null;
}
