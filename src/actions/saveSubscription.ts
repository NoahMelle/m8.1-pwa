import { db } from "@/db";
import { pushSubscriptionsTable } from "@/db/schemas";

export async function saveSubscription(subscription: PushSubscription) {
  await db.insert(pushSubscriptionsTable).values({
    endpoint: subscription.endpoint,
    keys: subscription.toJSON().keys,
  });
}
