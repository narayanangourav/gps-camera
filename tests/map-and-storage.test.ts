import test from "node:test";
import assert from "node:assert/strict";

import {
  MAP_TILE_URL_TEMPLATE,
  getTileUrl,
} from "../src/logics/functions.logic";
import { MAP_CONFIG, OSM_ATTRIBUTION_TEXT } from "../src/services/mapConfig.service";
import {
  loadJsonStorageValue,
  saveJsonStorageValue,
} from "../src/services/persistence.service";

test("exposes OSM-first map config and tile URLs", () => {
  assert.equal(MAP_CONFIG.attributionText, OSM_ATTRIBUTION_TEXT);
  assert.equal(MAP_TILE_URL_TEMPLATE.includes("{z}"), true);
  assert.match(getTileUrl(12.9716, 77.5946, 15), /^https:\/\/tile\.openstreetmap\.org\//);
});

test("reads and writes browser-safe json storage values", () => {
  const localStorageState = new Map<string, string>();

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => localStorageState.get(key) ?? null,
        setItem: (key: string, value: string) => {
          localStorageState.set(key, value);
        },
        removeItem: (key: string) => {
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

  saveJsonStorageValue("localStorage", "example", { enabled: true });
  const loaded = loadJsonStorageValue("localStorage", "example", {
    enabled: false,
  });

  assert.deepEqual(loaded, { enabled: true });
});
