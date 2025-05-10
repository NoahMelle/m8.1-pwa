"use client";

import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  KeepScale,
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import Spinner from "../reusable/Spinner";
import { UserLocation } from "@/@types/types";
import { getDistance } from "@/lib/geoLocation";

interface Location {
  name: string;
  position: {
    x: number;
    y: number;
  };
}

export default function ZoomableMap() {
  const [scale, setScale] = useState(1);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

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

    console.log(initialPosition.current, userLocation);

    const xDirection =
      initialPosition.current.longitude > userLocation.longitude ? -1 : 1;

    const yDirection =
      initialPosition.current.latitude > userLocation.latitude ? -1 : 1;

    const xDistance =
      getDistance(initialPosition.current, {
        latitude: initialPosition.current.latitude,
        longitude: userLocation.longitude,
      }) * xDirection;
    const yDistance =
      getDistance(initialPosition.current, {
        latitude: userLocation.latitude,
        longitude: initialPosition.current.longitude,
      }) * yDirection;

    console.log(xDistance, yDistance);

    setUserOffset({
      x: ((MAP_WIDTH / 2 + xDistance) / MAP_WIDTH) * 100,
      y: ((MAP_HEIGHT / 2 + yDistance) / MAP_HEIGHT) * 100,
    });
  }, [userLocation]);

  const locations: Location[] = [
    {
      position: {
        x: 62,
        y: 78,
      },
      name: "Ponton",
    },
  ];

  return (
    <div className="overflow-hidden h-full">
      <div className="fixed">
        {userLocation !== null && (
          <div>
            <p>lat: {userLocation.latitude}</p>
            <p>lon: {userLocation.longitude}</p>
          </div>
        )}
      </div>

      <Suspense fallback={"Loading...."}>
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
              {locations.map((location) => (
                <KeepScale
                  key={location.name}
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                  }}
                  className="absolute -translate-1/2 z-[1]"
                >
                  <div className="h-4 w-4 rounded-full bg-background border-foreground border-2"></div>
                  {scale > 3 && (
                    <h3 className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background px-2 py-1 leading-tight rounded-sm">
                      {location.name}
                    </h3>
                  )}
                </KeepScale>
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
      </Suspense>
    </div>
  );
}
