import { UserLocation } from "@/@types/types";
import { getRelativeMapOffset } from "@/lib/geoLocation";
import React, { useEffect, useRef, useState } from "react";
import { KeepScale } from "react-zoom-pan-pinch";

const MAP_HEIGHT = 750;
const MAP_WIDTH = 250;

export default function UserLocationMarker() {
  // Offset from starting point (in meters)
  const [userOffset, setUserOffset] = useState<{ x: number; y: number } | null>(
    null
  );
  // Location in latitude/longitude
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const initialPosition = useRef<UserLocation | null>(null);

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
        () => {
          setUserLocation(null);
          setUserOffset(null);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 10000,
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
      y: ((MAP_HEIGHT / 2 - yDistance) / MAP_HEIGHT) * 100,
    });
  }, [userLocation]);

  return (
    <KeepScale
      style={{
        left: `${userOffset?.x}%`,
        top: `${userOffset?.y}%`,
      }}
      className={`absolute -translate-1/2 z-[1] bg-blue border-blue-700 border h-4 w-4 rounded-full ${
        userOffset === null ? "hidden" : ""
      }`}
    ></KeepScale>
  );
}
