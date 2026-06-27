import { AppLocation, LocationSource } from "./location.model";

export type CameraCaptureMode = "picture" | "video";

export type CameraTimerSeconds = 0 | 3 | 5 | 10;

export type StampTemplateStyle = "classic";

export type StampConfig = {
  showDateTime: boolean;
  showAddress: boolean;
  showCoordinates: boolean;
  showMap: boolean;
  showWeather: boolean;
  showAccuracy: boolean;
  showAltitude: boolean;
  showTimezone: boolean;
  showWind: boolean;
  showHumidity: boolean;
  showPressure: boolean;
  showPlusCode: boolean;
  templateStyle: StampTemplateStyle;
  mapZoom: number;
  mapSize: number;
  textSize: number;
};

export type AppPreferences = {
  stampConfig: StampConfig;
  cameraSoundEnabled: boolean;
  timerSeconds: CameraTimerSeconds;
  locationMode: LocationSource;
  manualLocation: AppLocation | null;
  selectedProjectName: string;
};

export type CapturedMediaItem = {
  id: string;
  uri: string;
  type: CameraCaptureMode;
  createdAt: number;
  locationLabel: string | null;
  projectName: string;
};
