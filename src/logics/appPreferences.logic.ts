import { useEffect, useMemo, useState } from "react";

import {
  AppPreferences,
  CapturedMediaItem,
  StampConfig,
} from "../models/preferences.model";
import { AppLocation } from "../models/location.model";
import {
  PERSISTENCE_KEYS,
  loadJsonStorageValue,
  saveJsonStorageValue,
} from "../services/persistence.service";
import {
  DEFAULT_APP_PREFERENCES,
  mergeAppPreferences,
} from "../services/stamp.service";

export const useAppPreferencesLogic = () => {
  const [preferences, setPreferences] = useState<AppPreferences>(() =>
    mergeAppPreferences(
      loadJsonStorageValue(
        "localStorage",
        PERSISTENCE_KEYS.appPreferences,
        DEFAULT_APP_PREFERENCES,
      ),
    ),
  );
  const [captureHistory, setCaptureHistory] = useState<CapturedMediaItem[]>(() =>
    loadJsonStorageValue(
      "sessionStorage",
      PERSISTENCE_KEYS.captureHistory,
      [] as CapturedMediaItem[],
    ),
  );

  useEffect(() => {
    saveJsonStorageValue(
      "localStorage",
      PERSISTENCE_KEYS.appPreferences,
      preferences,
    );
  }, [preferences]);

  useEffect(() => {
    saveJsonStorageValue(
      "sessionStorage",
      PERSISTENCE_KEYS.captureHistory,
      captureHistory,
    );
  }, [captureHistory]);

  const actions = useMemo(
    () => ({
      setTimerSeconds: (timerSeconds: AppPreferences["timerSeconds"]) => {
        setPreferences((current) => ({ ...current, timerSeconds }));
      },
      setCameraSoundEnabled: (cameraSoundEnabled: boolean) => {
        setPreferences((current) => ({ ...current, cameraSoundEnabled }));
      },
      setLocationMode: (locationMode: AppPreferences["locationMode"]) => {
        setPreferences((current) => ({ ...current, locationMode }));
      },
      setManualLocation: (manualLocation: AppLocation | null) => {
        setPreferences((current) => ({ ...current, manualLocation }));
      },
      setSelectedProjectName: (selectedProjectName: string) => {
        setPreferences((current) => ({ ...current, selectedProjectName }));
      },
      updateStampConfig: (stampConfig: Partial<StampConfig>) => {
        setPreferences((current) => ({
          ...current,
          stampConfig: {
            ...current.stampConfig,
            ...stampConfig,
          },
        }));
      },
      resetPreferences: () => {
        setPreferences(DEFAULT_APP_PREFERENCES);
      },
      addCaptureHistoryItem: (item: CapturedMediaItem) => {
        setCaptureHistory((current) => [item, ...current].slice(0, 30));
      },
      removeCaptureHistoryItem: (id: string) => {
        setCaptureHistory((current) => current.filter((item) => item.id !== id));
      },
      clearCaptureHistory: () => {
        setCaptureHistory([]);
      },
    }),
    [],
  );

  return {
    preferences,
    captureHistory,
    ...actions,
  };
};
