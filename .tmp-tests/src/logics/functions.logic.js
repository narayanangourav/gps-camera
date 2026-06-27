"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddress = exports.getTileUrl = exports.toRegion = exports.getTileUrlFromXYZ = exports.isValidTileY = exports.wrapTileX = exports.getTileCoordinate = exports.clamp = exports.MAP_TILE_URL_TEMPLATE = exports.TARGET_ACCURACY_METERS = void 0;
const mapConfig_service_1 = require("../services/mapConfig.service");
exports.TARGET_ACCURACY_METERS = 25;
exports.MAP_TILE_URL_TEMPLATE = mapConfig_service_1.MAP_CONFIG.tileUrlTemplate;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
exports.clamp = clamp;
const getTileCoordinate = (latitude, longitude, zoom) => {
    const latRad = (latitude * Math.PI) / 180;
    const n = 2 ** zoom;
    return {
        x: ((longitude + 180) / 360) * n,
        y: ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
            n,
    };
};
exports.getTileCoordinate = getTileCoordinate;
const wrapTileX = (x, zoom) => {
    const tileCount = 2 ** zoom;
    return ((x % tileCount) + tileCount) % tileCount;
};
exports.wrapTileX = wrapTileX;
const isValidTileY = (y, zoom) => {
    const tileCount = 2 ** zoom;
    return y >= 0 && y < tileCount;
};
exports.isValidTileY = isValidTileY;
const getTileUrlFromXYZ = (x, y, zoom) => exports.MAP_TILE_URL_TEMPLATE
    .replace(/\{z\}/g, String(zoom))
    .replace(/\{x\}/g, String(x))
    .replace(/\{y\}/g, String(y))
    .replace(/\{s\}/g, "a");
exports.getTileUrlFromXYZ = getTileUrlFromXYZ;
const toRegion = (coords, current = null) => ({
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: current?.latitudeDelta ?? 0.01,
    longitudeDelta: current?.longitudeDelta ?? 0.01,
});
exports.toRegion = toRegion;
const getTileUrl = (latitude, longitude, zoom) => {
    const tileCoordinate = (0, exports.getTileCoordinate)(latitude, longitude, zoom);
    return (0, exports.getTileUrlFromXYZ)((0, exports.wrapTileX)(Math.floor(tileCoordinate.x), zoom), Math.floor(tileCoordinate.y), zoom);
};
exports.getTileUrl = getTileUrl;
const formatAddress = (address) => {
    if (!address)
        return null;
    const line1 = [address.name, address.street].filter(Boolean).join(", ");
    const line2 = [address.city, address.region, address.country]
        .filter(Boolean)
        .join(", ");
    const formatted = [line1, line2].filter(Boolean).join(" | ");
    return formatted || null;
};
exports.formatAddress = formatAddress;
