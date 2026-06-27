"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const functions_logic_1 = require("../src/logics/functions.logic");
const mapConfig_service_1 = require("../src/services/mapConfig.service");
const persistence_service_1 = require("../src/services/persistence.service");
(0, node_test_1.default)("exposes OSM-first map config and tile URLs", () => {
    strict_1.default.equal(mapConfig_service_1.MAP_CONFIG.attributionText, mapConfig_service_1.OSM_ATTRIBUTION_TEXT);
    strict_1.default.equal(functions_logic_1.MAP_TILE_URL_TEMPLATE.includes("{z}"), true);
    strict_1.default.match((0, functions_logic_1.getTileUrl)(12.9716, 77.5946, 15), /^https:\/\/tile\.openstreetmap\.org\//);
});
(0, node_test_1.default)("reads and writes browser-safe json storage values", () => {
    const localStorageState = new Map();
    Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: {
            localStorage: {
                getItem: (key) => localStorageState.get(key) ?? null,
                setItem: (key, value) => {
                    localStorageState.set(key, value);
                },
                removeItem: (key) => {
                    localStorageState.delete(key);
                },
            },
            sessionStorage: {
                getItem: () => null,
                setItem: () => undefined,
                removeItem: () => undefined,
            },
        },
    });
    (0, persistence_service_1.saveJsonStorageValue)("localStorage", "example", { enabled: true });
    const loaded = (0, persistence_service_1.loadJsonStorageValue)("localStorage", "example", {
        enabled: false,
    });
    strict_1.default.deepEqual(loaded, { enabled: true });
});
