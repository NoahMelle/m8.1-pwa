import ZoomableMap from "@/components/map/ZoomableMap";
import { getStages } from "@/lib/fetchers";
import React from "react";

export default async function Map() {
  const stages = await getStages();

  return (
    <div className="h-[100dvh] bg-green">
      <ZoomableMap stages={stages} />
    </div>
  );
}
