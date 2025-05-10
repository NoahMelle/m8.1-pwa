import { UserLocation } from "@/@types/types";

export function getDistance(initPos: UserLocation, currentPos: UserLocation) {
  const earthRadius = 6371;
  const dLat = toRad(currentPos.latitude - initPos.latitude);
  const dLon = toRad(currentPos.longitude - initPos.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(initPos.latitude)) *
      Math.cos(toRad(currentPos.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;
  return d * 1000;
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}
