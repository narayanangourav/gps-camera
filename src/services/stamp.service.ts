import {
  AppPreferences,
  CameraCaptureMode,
  CameraTimerSeconds,
  CapturedMediaItem,
  StampConfig,
} from "../models/preferences.model";

export const CAMERA_TIMER_OPTIONS: CameraTimerSeconds[] = [0, 3, 5, 10];

export const DEFAULT_PROJECT_NAME = "Default";

export const DEFAULT_STAMP_CONFIG: StampConfig = {
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

export const DEFAULT_APP_PREFERENCES: AppPreferences = {
  stampConfig: DEFAULT_STAMP_CONFIG,
  cameraSoundEnabled: true,
  timerSeconds: 0,
  locationMode: "automatic",
  manualLocation: null,
  selectedProjectName: DEFAULT_PROJECT_NAME,
};

export const isValidTimerSetting = (
  value: number,
): value is CameraTimerSeconds => CAMERA_TIMER_OPTIONS.includes(value as CameraTimerSeconds);

export const sanitizeProjectName = (value: string) => {
  const sanitized = value
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return sanitized || DEFAULT_PROJECT_NAME.toLowerCase();
};

export const buildDownloadFileName = (
  projectName: string,
  type: CameraCaptureMode,
  createdAt: number,
) => {
  const date = new Date(createdAt).toISOString().replace(/[:.]/g, "-");
  const prefix = sanitizeProjectName(projectName);
  const extension = type === "picture" ? "jpg" : "mp4";
  return `${prefix}_${date}.${extension}`;
};

export const mergeStampConfig = (
  partial: Partial<StampConfig>,
): StampConfig => ({
  ...DEFAULT_STAMP_CONFIG,
  ...partial,
});

export const isStampFieldEnabled = <K extends keyof StampConfig>(
  config: StampConfig,
  key: K,
) => Boolean(config[key]);

export const mergeAppPreferences = (
  partial: Partial<AppPreferences>,
): AppPreferences => ({
  ...DEFAULT_APP_PREFERENCES,
  ...partial,
  stampConfig: mergeStampConfig(partial.stampConfig ?? {}),
});

export const createCapturedMediaItem = (
  uri: string,
  type: CameraCaptureMode,
  projectName: string,
  locationLabel: string | null,
  createdAt = Date.now(),
): CapturedMediaItem => ({
  id: `${createdAt}-${type}`,
  uri,
  type,
  createdAt,
  locationLabel,
  projectName,
});
