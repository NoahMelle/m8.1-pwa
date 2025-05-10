import ZoomableMap from "@/components/map/ZoomableMap";
import React from "react";

export default function Map() {
  return (
    <div className="h-[100dvh] bg-green">
      <ZoomableMap />
    </div>
  );
}
