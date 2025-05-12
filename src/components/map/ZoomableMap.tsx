"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  KeepScale,
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import Spinner from "../reusable/Spinner";
import { StageType, UserLocation } from "@/@types/types";
import { getRelativeMapOffset } from "@/lib/geoLocation";
import MapLocation from "./MapLocation";
import LocationPopup from "./LocationPopup";
import { AnimatePresence } from "motion/react";

export default function ZoomableMap({ stages }: { stages: StageType[] }) {
  const [scale, setScale] = useState(1);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [highlightedLocation, setHighlightedLocation] =
    useState<StageType | null>(null);

  const [userOffset, setUserOffset] = useState<{ x: number; y: number } | null>(
    null
  );

  const initialPosition = useRef<UserLocation | null>(null);

  const MAP_HEIGHT = 750;
  const MAP_WIDTH = 250;

  function handleTransform(e: ReactZoomPanPinchRef) {
    setScale(e.instance.transformState.scale);
  }

  useEffect(() => {
    let watchId: number | null = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (!initialPosition.current) {
            initialPosition.current = { latitude, longitude };
          }

          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true, // More updates, better accuracy
          maximumAge: 1000, // Accept a cached position max 1 second old
          timeout: 10000, // Give up after 10s
        }
      );
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (!initialPosition.current || !userLocation) return;

    const { xDistance, yDistance } = getRelativeMapOffset(
      initialPosition.current,
      userLocation
    );

    setUserOffset({
      x: ((MAP_WIDTH / 2 + xDistance) / MAP_WIDTH) * 100,
      y: ((MAP_HEIGHT / 2 + yDistance) / MAP_HEIGHT) * 100,
    });
  }, [userLocation]);

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
        {!hasInitialized && (
          <div className="absolute h-full w-full top-0 left-0 bg-green z-[1] flex justify-center items-center">
            <Spinner />
          </div>
        )}
        <TransformComponent wrapperClass="w-full! h-full! relative z-0 isolate">
          <KeepScale
            style={{
              left: `${userOffset?.x}%`,
              top: `${userOffset?.y}%`,
            }}
            className={`absolute -translate-1/2 z-[1] bg-red h-4 w-4 rounded-full ${
              userOffset === null ? "hidden" : ""
            }`}
          ></KeepScale>
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
