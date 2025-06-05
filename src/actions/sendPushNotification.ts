"use server";

import webpush from "web-push";
import { db } from "@/db";
import { env } from "@/env";

webpush.setVapidDetails(
  "231195@student.glu.nl",
  env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
);

export async function sendNotification() {
  const subscriptions = await db.query.pushSubscriptionsTable.findMany();

  const payload = JSON.stringify({
    title: "Hello!",
    body: "This is a test push message.",
    url: "/",
  });

  await Promise.all(
    subscriptions.map((sub) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: sub.keys as { p256dh: string; auth: string },
      };
      return webpush
        .sendNotification(pushSubscription, payload)
        .catch((err) => {
          throw new Error("Push error:", err);
        });
    })
  );
}
