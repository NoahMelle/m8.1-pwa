export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function success(position: GeolocationPosition) {
  console.log(position.coords);
}

function error() {
  alert("Failed to fetch position.");
}

export function getDistance(
  initPos: { lon: number; lat: number },
  currentPos: { lon: number; lat: number }
) {
  const earthRadius = 6371;
  const dLat = toRad(currentPos.lat - initPos.lat);
  const dLon = toRad(currentPos.lon - currentPos.lat);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(initPos.lat)) *
      Math.cos(toRad(currentPos.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;
  return d;
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}
