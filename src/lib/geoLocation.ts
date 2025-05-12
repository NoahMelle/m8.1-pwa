import { UserLocation } from "@/@types/types";

/**
 * @see {@link https://www.movable-type.co.uk/scripts/latlong.html}
 * @param initPos The starting position
 * @param currentPos The current position
 * @returns Real-world distance between 2 points on a globe
 */
export function getDistance(initPos: UserLocation, currentPos: UserLocation) {
  const earthRadius = 6371;

  const dLat = toRad(currentPos.latitude - initPos.latitude);
  const dLon = toRad(currentPos.longitude - initPos.longitude);

  // Some haversine formula stuff I definitely understand (no)
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

export function getRelativeMapOffset(
  initPos: UserLocation,
  currentPos: UserLocation
): { xDistance: number; yDistance: number } {
  const xDirection = initPos.longitude > currentPos.longitude ? -1 : 1;
  const yDirection = initPos.latitude > currentPos.latitude ? -1 : 1;

  const xDistance =
    getDistance(initPos, {
      latitude: initPos.latitude,
      longitude: currentPos.longitude,
    }) * xDirection;
  const yDistance =
    getDistance(initPos, {
      latitude: currentPos.latitude,
      longitude: initPos.longitude,
    }) * yDirection;

  return {
    xDistance,
    yDistance,
  };
}
