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
import { IceCream, Lock, Martini, Shirt, Utensils } from "lucide-react";

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
      Icon: IceCream,
      position: {
        xPosition: 15,
        yPosition: 17,
      },
    },
    {
      Icon: Martini,
      position: {
        xPosition: 27,
        yPosition: 18,
      },
    },
    {
      Icon: Martini,
      position: {
        xPosition: 31,
        yPosition: 28,
      },
    },
    {
      Icon: IceCream,
      position: {
        xPosition: 34,
        yPosition: 37,
      },
    },
    {
      Icon: Shirt,
      position: {
        xPosition: 44,
        yPosition: 36,
      },
    },
    {
      Icon: Utensils,
      position: {
        xPosition: 40,
        yPosition: 49,
      },
    },
    {
      Icon: IceCream,
      position: {
        xPosition: 41,
        yPosition: 58,
      },
    },
    {
      Icon: Utensils,
      position: {
        xPosition: 43,
        yPosition: 65,
      },
    },
    {
      Icon: Shirt,
      position: {
        xPosition: 37,
        yPosition: 70,
      },
    },
    {
      Icon: Utensils,
      position: {
        xPosition: 62,
        yPosition: 88,
      },
    },
    {
      Icon: Martini,
      position: {
        xPosition: 74,
        yPosition: 87,
      },
    },
    {
      Icon: Shirt,
      position: {
        xPosition: 82,
        yPosition: 82,
      },
    },
    {
      Icon: Lock,
      position: {
        xPosition: 85,
        yPosition: 77,
      },
    },
    {
      Icon: Lock,
      position: {
        xPosition: 85,
        yPosition: 68,
      },
    },
  ];

  return (
    <div className="overflow-hidden h-full">
      <TransformWrapper
        initialScale={1}
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
          <div className="h-full w-full">
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
            <div className="relative aspect-[1353/2330] h-full w-auto">
              <Image
                src={"/img/map.svg"}
                sizes="100vw"
                alt="Map of the terrain"
                width={1353}
                height={2330}
                className="dark:brightness-75 dark:contrast-125 dark:hue-rotate-30 object-cover"
              />
            </div>
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
