"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERSISTENCE_KEYS = exports.saveJsonStorageValue = exports.loadJsonStorageValue = void 0;
const canUseDomStorage = (storage) => {
    if (typeof window === "undefined") {
        return false;
    }
    try {
        const store = window[storage];
        const probeKey = "__gps_camera_probe__";
        store.setItem(probeKey, probeKey);
        store.removeItem(probeKey);
        return true;
    }
    catch (_error) {
        return false;
    }
};
const readStorageValue = (storage, key) => {
    if (!canUseDomStorage(storage)) {
        return null;
    }
    return window[storage].getItem(key);
};
const writeStorageValue = (storage, key, value) => {
    if (!canUseDomStorage(storage)) {
        return;
    }
    window[storage].setItem(key, value);
};
const loadJsonStorageValue = (storage, key, fallback) => {
    const raw = readStorageValue(storage, key);
    if (!raw) {
        return fallback;
    }
    try {
        return JSON.parse(raw);
    }
    catch (_error) {
        return fallback;
    }
};
exports.loadJsonStorageValue = loadJsonStorageValue;
const saveJsonStorageValue = (storage, key, value) => {
    writeStorageValue(storage, key, JSON.stringify(value));
};
exports.saveJsonStorageValue = saveJsonStorageValue;
exports.PERSISTENCE_KEYS = {
    appPreferences: "gps-camera.preferences",
    captureHistory: "gps-camera.capture-history",
};
