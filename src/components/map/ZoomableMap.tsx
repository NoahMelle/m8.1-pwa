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
import Marker, { MarkerProps } from "./Marker";

export default function ZoomableMap({ stages }: { stages: StageType[] }) {
  const [scale, setScale] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [highlightedLocation, setHighlightedLocation] =
    useState<StageType | null>(null);

  function handleTransform(e: ReactZoomPanPinchRef) {
    setScale(e.instance.transformState.scale);
  }

  const markers: MarkerProps[] = [
    {
      icon: "/icons/icecream.svg",
      position: {
        xPosition: 15,
        yPosition: 17,
      },
    },
    {
      icon: "/icons/bar.svg",
      position: {
        xPosition: 27,
        yPosition: 18,
      },
    },
    {
      icon: "/icons/bar.svg",
      position: {
        xPosition: 31,
        yPosition: 28,
      },
    },
    {
      icon: "/icons/icecream.svg",
      position: {
        xPosition: 34,
        yPosition: 37,
      },
    },
    {
      icon: "/icons/t-shirt.svg",
      position: {
        xPosition: 44,
        yPosition: 36,
      },
    },
    {
      icon: "/icons/restaurant.svg",
      position: {
        xPosition: 40,
        yPosition: 49,
      },
    },
    {
      icon: "/icons/icecream.svg",
      position: {
        xPosition: 41,
        yPosition: 58,
      },
    },
    {
      icon: "/icons/restaurant.svg",
      position: {
        xPosition: 43,
        yPosition: 65,
      },
    },
    {
      icon: "/icons/t-shirt.svg",
      position: {
        xPosition: 37,
        yPosition: 70,
      },
    },
    {
      icon: "/icons/restaurant.svg",
      position: {
        xPosition: 62,
        yPosition: 88,
      },
    },
    {
      icon: "/icons/bar.svg",
      position: {
        xPosition: 74,
        yPosition: 87,
      },
    },
    {
      icon: "/icons/t-shirt.svg",
      position: {
        xPosition: 82,
        yPosition: 82,
      },
    },
    {
      icon: "/icons/lock.svg",
      position: {
        xPosition: 85,
        yPosition: 77,
      },
    },
    {
      icon: "/icons/lock.svg",
      position: {
        xPosition: 85,
        yPosition: 68,
      },
    },
  ];

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
            {markers.map((marker, index) => (
              <Marker key={index} {...marker} scale={scale} />
            ))}
            {stages.map((stage) => (
              <MapLocation
                key={stage.name}
                stage={stage}
                scale={scale}
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
