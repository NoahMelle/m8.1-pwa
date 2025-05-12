import { UserLocation } from "@/@types/types";
import { getDistance, getRelativeMapOffset } from "../src/lib/geoLocation";

const round = (value: number, decimals: number = 2) =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;

describe("getDistance", () => {
  it("returns 0 for same location", () => {
    const pos: UserLocation = { latitude: 40.7128, longitude: -74.006 };
    expect(getDistance(pos, pos)).toBeCloseTo(0);
  });

  it("calculates known distance between NYC and LA", () => {
    const nyc: UserLocation = { latitude: 40.7128, longitude: -74.006 };
    const la: UserLocation = { latitude: 34.0522, longitude: -118.2437 };
    const distance = getDistance(nyc, la);

    // Approx. 3936000 meters (3,936 km)
    expect(round(distance, -3)).toBeCloseTo(3936000, -3);
  });

  it("calculates small distance between two close points", () => {
    const pos1: UserLocation = { latitude: 51.5007, longitude: -0.1246 };
    const pos2: UserLocation = { latitude: 51.501, longitude: -0.1416 };
    const distance = getDistance(pos1, pos2);

    // Approx. 1170 meters
    expect(round(distance)).toBeCloseTo(1170, -2);
  });
});

describe("getRelativeMapOffset", () => {
  const base: UserLocation = { latitude: 40.0, longitude: -75.0 };

  it("returns 0 offset for same location", () => {
    const result = getRelativeMapOffset(base, base);
    expect(round(result.xDistance)).toBe(0);
    expect(round(result.yDistance)).toBe(0);
  });

  it("returns positive x/y for northeast of base", () => {
    const current: UserLocation = { latitude: 41.0, longitude: -74.0 };
    const { xDistance, yDistance } = getRelativeMapOffset(base, current);
    expect(xDistance).toBeGreaterThan(0);
    expect(yDistance).toBeGreaterThan(0);
  });

  it("returns negative x/y for southwest of base", () => {
    const current: UserLocation = { latitude: 39.0, longitude: -76.0 };
    const { xDistance, yDistance } = getRelativeMapOffset(base, current);
    expect(xDistance).toBeLessThan(0);
    expect(yDistance).toBeLessThan(0);
  });

  it("returns positive x, negative y for southeast", () => {
    const current: UserLocation = { latitude: 39.0, longitude: -74.0 };
    const { xDistance, yDistance } = getRelativeMapOffset(base, current);
    expect(xDistance).toBeGreaterThan(0);
    expect(yDistance).toBeLessThan(0);
  });
});
