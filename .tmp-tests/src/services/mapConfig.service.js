"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAP_CONFIG = exports.OSM_ATTRIBUTION_TEXT = exports.DEFAULT_TILE_URL_TEMPLATE = void 0;
exports.DEFAULT_TILE_URL_TEMPLATE = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
exports.OSM_ATTRIBUTION_TEXT = "\u00A9 OpenStreetMap contributors";
const browserTileUrlTemplate = typeof window !== "undefined"
    ? window.__gpsCameraEnv?.tileUrlTemplate?.trim()
    : undefined;
exports.MAP_CONFIG = {
    tileUrlTemplate: browserTileUrlTemplate || exports.DEFAULT_TILE_URL_TEMPLATE,
    attributionText: exports.OSM_ATTRIBUTION_TEXT,
    defaultZoom: 15,
    minZoom: 1,
    maxZoom: 19,
};
