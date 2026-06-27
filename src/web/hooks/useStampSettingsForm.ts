import { useMemo, useState } from "react";

import { StampConfig } from "../../models/preferences.model";
import { AppPreferences } from "../../models/preferences.model";
import {
  CAMERA_TIMER_OPTIONS,
  DEFAULT_PROJECT_NAME,
} from "../../services/stamp.service";

const STAMP_FIELDS: Array<{
  key: keyof StampConfig;
  label: string;
}> = [
  { key: "showDateTime", label: "Date and time" },
  { key: "showAddress", label: "Address" },
  { key: "showCoordinates", label: "Coordinates" },
  { key: "showMap", label: "Map preview" },
  { key: "showWeather", label: "Weather" },
  { key: "showAccuracy", label: "Accuracy" },
  { key: "showAltitude", label: "Altitude" },
  { key: "showTimezone", label: "Timezone" },
  { key: "showWind", label: "Wind" },
  { key: "showHumidity", label: "Humidity" },
  { key: "showPressure", label: "Pressure" },
];

type UseStampSettingsFormOptions = {
  preferences: AppPreferences;
  setTimerSeconds: (value: AppPreferences["timerSeconds"]) => void;
  setCameraSoundEnabled: (value: boolean) => void;
  setSelectedProjectName: (value: string) => void;
  updateStampConfig: (config: Partial<StampConfig>) => void;
};

export const useStampSettingsForm = ({
  preferences,
  setTimerSeconds,
  setCameraSoundEnabled,
  setSelectedProjectName,
  updateStampConfig,
}: UseStampSettingsFormOptions) => {
  const [customProjectName, setCustomProjectName] = useState(
    preferences.selectedProjectName,
  );

  const stampFields = useMemo(
    () =>
      STAMP_FIELDS.map((field) => ({
        ...field,
        enabled: preferences.stampConfig[field.key],
      })),
    [preferences.stampConfig],
  );

  return {
    timerOptions: CAMERA_TIMER_OPTIONS,
    timerSeconds: preferences.timerSeconds,
    cameraSoundEnabled: preferences.cameraSoundEnabled,
    selectedProjectName: preferences.selectedProjectName,
    customProjectName,
    quickProjectNames: [DEFAULT_PROJECT_NAME, "Site 1", "Site 2"],
    stampFields,
    setCustomProjectName,
    setTimerSeconds,
    toggleCameraSound: () =>
      setCameraSoundEnabled(!preferences.cameraSoundEnabled),
    toggleStampField: (key: keyof StampConfig) =>
      updateStampConfig({ [key]: !preferences.stampConfig[key] }),
    applyProjectName: (value: string) =>
      setSelectedProjectName(value.trim() || DEFAULT_PROJECT_NAME),
  };
};
