export const DEFAULT_TILE_URL_TEMPLATE =
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export const OSM_ATTRIBUTION_TEXT = "\u00A9 OpenStreetMap contributors";

const browserTileUrlTemplate =
  typeof window !== "undefined"
    ? window.__gpsCameraEnv?.tileUrlTemplate?.trim()
    : undefined;

export const MAP_CONFIG = {
  tileUrlTemplate: browserTileUrlTemplate || DEFAULT_TILE_URL_TEMPLATE,
  attributionText: OSM_ATTRIBUTION_TEXT,
  defaultZoom: 15,
  minZoom: 1,
  maxZoom: 19,
} as const;
