const canUseDomStorage = (storage: "localStorage" | "sessionStorage") => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const store = window[storage];
    const probeKey = "__gps_camera_probe__";
    store.setItem(probeKey, probeKey);
    store.removeItem(probeKey);
    return true;
  } catch (_error) {
    return false;
  }
};

const readStorageValue = (
  storage: "localStorage" | "sessionStorage",
  key: string,
) => {
  if (!canUseDomStorage(storage)) {
    return null;
  }

  return window[storage].getItem(key);
};

const writeStorageValue = (
  storage: "localStorage" | "sessionStorage",
  key: string,
  value: string,
) => {
  if (!canUseDomStorage(storage)) {
    return;
  }

  window[storage].setItem(key, value);
};

export const loadJsonStorageValue = <T>(
  storage: "localStorage" | "sessionStorage",
  key: string,
  fallback: T,
): T => {
  const raw = readStorageValue(storage, key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (_error) {
    return fallback;
  }
};

export const saveJsonStorageValue = <T>(
  storage: "localStorage" | "sessionStorage",
  key: string,
  value: T,
) => {
  writeStorageValue(storage, key, JSON.stringify(value));
};

export const PERSISTENCE_KEYS = {
  appPreferences: "gps-camera.preferences",
  captureHistory: "gps-camera.capture-history",
} as const;
