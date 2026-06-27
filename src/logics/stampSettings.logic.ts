import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";

import { StampConfig } from "../models/preferences.model";
import { useAppPreferences } from "../state/AppPreferencesProvider";
import {
  CAMERA_TIMER_OPTIONS,
  DEFAULT_PROJECT_NAME,
} from "../services/stamp.service";

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
  { key: "showPlusCode", label: "Plus code" },
];

export const useStampSettingsLogic = () => {
  const navigation = useNavigation<any>();
  const {
    preferences,
    setTimerSeconds,
    setCameraSoundEnabled,
    setSelectedProjectName,
    updateStampConfig,
  } = useAppPreferences();
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
    timerSeconds: preferences.timerSeconds,
    cameraSoundEnabled: preferences.cameraSoundEnabled,
    selectedProjectName: preferences.selectedProjectName,
    customProjectName,
    stampFields,
    timerOptions: CAMERA_TIMER_OPTIONS,
    quickProjectNames: [DEFAULT_PROJECT_NAME, "Site 1", "Site 2"],
    setCustomProjectName,
    setTimerSeconds,
    toggleCameraSound: () =>
      setCameraSoundEnabled(!preferences.cameraSoundEnabled),
    toggleStampField: (key: keyof StampConfig) =>
      updateStampConfig({ [key]: !preferences.stampConfig[key] }),
    applyProjectName: (value: string) =>
      setSelectedProjectName(value.trim() || DEFAULT_PROJECT_NAME),
    goBack: () => navigation.goBack(),
  };
};
