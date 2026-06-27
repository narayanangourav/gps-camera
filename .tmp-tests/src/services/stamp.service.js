"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCapturedMediaItem = exports.mergeAppPreferences = exports.isStampFieldEnabled = exports.mergeStampConfig = exports.buildDownloadFileName = exports.sanitizeProjectName = exports.isValidTimerSetting = exports.DEFAULT_APP_PREFERENCES = exports.DEFAULT_STAMP_CONFIG = exports.DEFAULT_PROJECT_NAME = exports.CAMERA_TIMER_OPTIONS = void 0;
exports.CAMERA_TIMER_OPTIONS = [0, 3, 5, 10];
exports.DEFAULT_PROJECT_NAME = "Default";
exports.DEFAULT_STAMP_CONFIG = {
    showDateTime: true,
    showAddress: true,
    showCoordinates: true,
    showMap: true,
    showWeather: true,
    showAccuracy: true,
    showAltitude: false,
    showTimezone: false,
    showWind: false,
    showHumidity: false,
    showPressure: false,
    showPlusCode: false,
    templateStyle: "classic",
    mapZoom: 15,
    mapSize: 72,
    textSize: 1,
};
exports.DEFAULT_APP_PREFERENCES = {
    stampConfig: exports.DEFAULT_STAMP_CONFIG,
    cameraSoundEnabled: true,
    timerSeconds: 0,
    locationMode: "automatic",
    manualLocation: null,
    selectedProjectName: exports.DEFAULT_PROJECT_NAME,
};
const isValidTimerSetting = (value) => exports.CAMERA_TIMER_OPTIONS.includes(value);
exports.isValidTimerSetting = isValidTimerSetting;
const sanitizeProjectName = (value) => {
    const sanitized = value
        .trim()
        .replace(/[<>:"/\\|?*\u0000-\u001F]+/g, "-")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    return sanitized || exports.DEFAULT_PROJECT_NAME.toLowerCase();
};
exports.sanitizeProjectName = sanitizeProjectName;
const buildDownloadFileName = (projectName, type, createdAt) => {
    const date = new Date(createdAt).toISOString().replace(/[:.]/g, "-");
    const prefix = (0, exports.sanitizeProjectName)(projectName);
    const extension = type === "picture" ? "jpg" : "mp4";
    return `${prefix}_${date}.${extension}`;
};
exports.buildDownloadFileName = buildDownloadFileName;
const mergeStampConfig = (partial) => ({
    ...exports.DEFAULT_STAMP_CONFIG,
    ...partial,
});
exports.mergeStampConfig = mergeStampConfig;
const isStampFieldEnabled = (config, key) => Boolean(config[key]);
exports.isStampFieldEnabled = isStampFieldEnabled;
const mergeAppPreferences = (partial) => ({
    ...exports.DEFAULT_APP_PREFERENCES,
    ...partial,
    stampConfig: (0, exports.mergeStampConfig)(partial.stampConfig ?? {}),
});
exports.mergeAppPreferences = mergeAppPreferences;
const createCapturedMediaItem = (uri, type, projectName, locationLabel, createdAt = Date.now()) => ({
    id: `${createdAt}-${type}`,
    uri,
    type,
    createdAt,
    locationLabel,
    projectName,
});
exports.createCapturedMediaItem = createCapturedMediaItem;
