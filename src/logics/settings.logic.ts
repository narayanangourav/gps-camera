import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useMemo, useState } from "react";
import { LayoutAnimation } from "react-native";

import { appTheme } from "./theme.logic";
import { useAppPreferences } from "../state/AppPreferencesProvider";
import { CAMERA_TIMER_OPTIONS } from "../services/stamp.service";

export type SettingsMenuItem = {
  id: string;
  icon: keyof typeof import("@expo/vector-icons").Ionicons.glyphMap;
  title: string;
  subtitle: string;
  details: string;
  actionLabel: string;
  action: () => void;
  color: string;
};

export function useSettingsLogic() {
  const navigation = useNavigation<any>();
  const { preferences, captureHistory, setCameraSoundEnabled, setTimerSeconds } =
    useAppPreferences();
  const version = Constants.expoConfig?.version || "1.0.0";
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const cycleTimer = () => {
    const currentIndex = CAMERA_TIMER_OPTIONS.indexOf(preferences.timerSeconds);
    const nextValue =
      CAMERA_TIMER_OPTIONS[(currentIndex + 1) % CAMERA_TIMER_OPTIONS.length];
    setTimerSeconds(nextValue);
  };

  const menuItems: SettingsMenuItem[] = useMemo(
    () => [
      {
        id: "location-mode",
        icon: "location",
        title: "Location Mode",
        subtitle:
          preferences.locationMode === "manual"
            ? "Manual coordinates are active"
            : "Automatic browser GPS is active",
        details:
          "Switch between automatic browser geolocation and a saved manual coordinate set. Manual mode is useful when you need a fixed project location or geolocation is unavailable.",
        actionLabel: "Open Location Settings",
        action: () => navigation.navigate("LocationSettings"),
        color: appTheme.palette.accent,
      },
      {
        id: "stamp-settings",
        icon: "options",
        title: "Stamp Settings",
        subtitle: `${preferences.selectedProjectName} | Timer ${preferences.timerSeconds === 0 ? "Off" : `${preferences.timerSeconds}s`}`,
        details:
          "Manage project naming, stamp field visibility, web-safe shutter feedback, and timer countdown behavior. These settings are stored locally in the browser.",
        actionLabel: "Open Stamp Settings",
        action: () => navigation.navigate("StampSettings"),
        color: appTheme.colors.textPrimary,
      },
      {
        id: "timer",
        icon: "timer",
        title: "Capture Timer",
        subtitle:
          preferences.timerSeconds === 0
            ? "Countdown disabled"
            : `${preferences.timerSeconds} second countdown`,
        details:
          "Cycle between Off, 3s, 5s, and 10s. The active timer is applied before photo capture or video recording begins.",
        actionLabel: "Cycle Timer",
        action: cycleTimer,
        color: appTheme.colors.textSecondary,
      },
      {
        id: "camera-sound",
        icon: "volume-high",
        title: "Camera Sound",
        subtitle: preferences.cameraSoundEnabled
          ? "Web shutter feedback enabled"
          : "Web shutter feedback disabled",
        details:
          "This controls web-safe sound feedback after captures. Browsers may still suppress audio until the page has received a user interaction.",
        actionLabel: preferences.cameraSoundEnabled ? "Disable Sound" : "Enable Sound",
        action: () => setCameraSoundEnabled(!preferences.cameraSoundEnabled),
        color: appTheme.colors.textSecondary,
      },
      {
        id: "map",
        icon: "map",
        title: "Full Map",
        subtitle: "Open the full-screen OpenStreetMap view",
        details:
          "Use the expanded map for a clearer location preview and to copy the current automatic position into manual mode when needed.",
        actionLabel: "Open Map",
        action: () => navigation.navigate("Map"),
        color: appTheme.palette.accent,
      },
      {
        id: "history",
        icon: "images",
        title: "Capture History",
        subtitle: `${captureHistory.length} captures in this browser session`,
        details:
          "Recent captured images are kept for the current browser session. Open, download, or remove them from the session history.",
        actionLabel: "Open History",
        action: () => navigation.navigate("CaptureHistory"),
        color: appTheme.colors.textMuted,
      },
    ],
    [
      captureHistory.length,
      navigation,
      preferences.cameraSoundEnabled,
      preferences.locationMode,
      preferences.selectedProjectName,
      preferences.timerSeconds,
      setCameraSoundEnabled,
      setTimerSeconds,
    ],
  );

  const sortedItems = useMemo(
    () => [...menuItems].sort((a, b) => a.title.localeCompare(b.title)),
    [menuItems],
  );

  const goBack = () => {
    navigation.goBack();
  };

  return {
    version,
    expandedId,
    sortedItems,
    toggleExpand,
    goBack,
  };
}
