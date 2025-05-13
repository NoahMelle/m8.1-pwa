"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { StageType } from "@/@types/types";
import MapLocation from "./MapLocation";
import LocationPopup from "./LocationPopup";
import { AnimatePresence } from "motion/react";
import UserLocationMarker from "./UserLocationMarker";
import Loading from "./Loading";

export default function ZoomableMap({ stages }: { stages: StageType[] }) {
  const [scale, setScale] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [highlightedLocation, setHighlightedLocation] =
    useState<StageType | null>(null);

  function handleTransform(e: ReactZoomPanPinchRef) {
    setScale(e.instance.transformState.scale);
  }

  return (
    <div className="overflow-hidden h-full">
      <TransformWrapper
        initialScale={1.5}
        centerOnInit={true}
        centerZoomedOut
        limitToBounds
        minScale={1}
        onTransformed={(e) => handleTransform(e)}
        onInit={() => setHasInitialized(true)}
      >
        {!hasInitialized && <Loading />}
        <TransformComponent wrapperClass="w-full! h-full! relative z-0 isolate">
          <UserLocationMarker />
          <div>
            {stages.map((stage) => (
              <MapLocation
                stage={stage}
                scale={scale}
                key={stage.name}
                setHighlightedLocation={setHighlightedLocation}
              />
            ))}
            <Image
              src={"/img/map_no_bg.png"}
              sizes="100vh"
              alt="Map of the terrain"
              width={0}
              height={0}
              className="w-full h-full dark:brightness-75 dark:contrast-125 dark:hue-rotate-30"
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <AnimatePresence>
        {highlightedLocation && (
          <LocationPopup
            stage={highlightedLocation}
            setIsShowing={setHighlightedLocation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
