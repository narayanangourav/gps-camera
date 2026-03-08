import * as Location from "expo-location";

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

export const TARGET_ACCURACY_METERS = 25;

const DEFAULT_TILE_URL_TEMPLATE = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const DEFAULT_TILE_ATTRIBUTION = "(c) OpenStreetMap contributors";

export const MAP_TILE_URL_TEMPLATE =
  process.env.EXPO_PUBLIC_TILE_URL_TEMPLATE?.trim() ||
  DEFAULT_TILE_URL_TEMPLATE;

export const MAP_TILE_ATTRIBUTION =
  process.env.EXPO_PUBLIC_TILE_ATTRIBUTION?.trim() || DEFAULT_TILE_ATTRIBUTION;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getTileCoordinate = (
  latitude: number,
  longitude: number,
  zoom: number,
) => {
  const latRad = (latitude * Math.PI) / 180;
  const n = 2 ** zoom;

  return {
    x: ((longitude + 180) / 360) * n,
    y:
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      n,
  };
};

export const wrapTileX = (x: number, zoom: number) => {
  const tileCount = 2 ** zoom;
  return ((x % tileCount) + tileCount) % tileCount;
};

export const isValidTileY = (y: number, zoom: number) => {
  const tileCount = 2 ** zoom;
  return y >= 0 && y < tileCount;
};

export const getTileUrlFromXYZ = (x: number, y: number, zoom: number) =>
  MAP_TILE_URL_TEMPLATE
    .replace(/\{z\}/g, String(zoom))
    .replace(/\{x\}/g, String(x))
    .replace(/\{y\}/g, String(y))
    .replace(/\{s\}/g, "a");

export const toRegion = (
  coords: MapCoordinate,
  current: MapRegion | null = null,
): MapRegion => ({
  latitude: coords.latitude,
  longitude: coords.longitude,
  latitudeDelta: current?.latitudeDelta ?? 0.01,
  longitudeDelta: current?.longitudeDelta ?? 0.01,
});

export const getTileUrl = (latitude: number, longitude: number, zoom: number) => {
  const tileCoordinate = getTileCoordinate(latitude, longitude, zoom);
  return getTileUrlFromXYZ(
    wrapTileX(Math.floor(tileCoordinate.x), zoom),
    Math.floor(tileCoordinate.y),
    zoom,
  );
};

export const formatAddress = (
  address: Location.LocationGeocodedAddress | null | undefined,
): string | null => {
  if (!address) return null;
  const line1 = [address.name, address.street].filter(Boolean).join(", ");
  const line2 = [address.city, address.region, address.country]
    .filter(Boolean)
    .join(", ");
  const formatted = [line1, line2].filter(Boolean).join(" | ");
  return formatted || null;
};
