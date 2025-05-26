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
  // Facing direction (0 degrees is north)
  const [userDirection, setUserDirection] = useState<number | null>(null);
  // Location in latitude/longitude
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const initialPosition = useRef<UserLocation | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading } = position.coords;

          setUserDirection(heading);

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
    >
      <div
        className={`absolute inset-0 flex justify-center items-center w-fit h-fit ${
          userDirection === null ? "hidden" : ""
        }`}
      >
        <div
          style={{
            transform: `rotate(${userDirection ?? 0}deg) rotate(45deg)`,
          }}
          className="w-4 h-4 border-t-2 border-l-2 border-black transition-transform dark:border-white transform origin-center"
        />
      </div>
    </KeepScale>
  );
}
