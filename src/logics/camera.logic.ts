import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import ViewShot from "react-native-view-shot";

import { AppLocation, LocationAddress } from "../models/location.model";
import { CameraCaptureMode } from "../models/preferences.model";
import { WeatherSnapshot } from "../models/weather.model";
import { useAppPreferences } from "../state/AppPreferencesProvider";
import {
  buildAddressFromExpo,
  fetchRemoteLocationAddress,
  selectActiveLocation,
  toAppLocationFromExpo,
} from "../services/location.service";
import {
  buildDownloadFileName,
  createCapturedMediaItem,
} from "../services/stamp.service";
import {
  EMPTY_WEATHER_SNAPSHOT,
  fetchWeatherSnapshot,
} from "../services/weather.service";

type CaptureMode = CameraCaptureMode;

const createAddressLines = (
  address: LocationAddress | null,
  fallbackLatitude: number | null,
  fallbackLongitude: number | null,
) => {
  if (address) {
    return {
      line1: address.line1,
      line2: address.line2,
    };
  }

  if (fallbackLatitude === null || fallbackLongitude === null) {
    return {
      line1: "Fetching location...",
      line2: "",
    };
  }

  return {
    line1: `${fallbackLatitude.toFixed(6)}, ${fallbackLongitude.toFixed(6)}`,
    line2: "Address unavailable",
  };
};

const playShutterFeedback = () => {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return;
  }

  const AudioContextCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextCtor) {
    return;
  }

  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(880, context.currentTime);
  gainNode.gain.setValueAtTime(0.001, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.12);
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.12);
  oscillator.onended = () => {
    void context.close();
  };
};

export function useCameraLogic(mode: CaptureMode) {
  const {
    preferences,
    addCaptureHistoryItem,
  } = useAppPreferences();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission] = Location.useForegroundPermissions();
  const [automaticLocation, setAutomaticLocation] = useState<AppLocation | null>(
    null,
  );
  const [weather, setWeather] = useState<WeatherSnapshot>(EMPTY_WEATHER_SNAPSHOT);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [isDualMode, setIsDualMode] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [countdownRemaining, setCountdownRemaining] = useState<number | null>(null);

  const viewShotRef = useRef<ViewShot>(null);
  const cameraRef = useRef<CameraView>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const captureTimerRef = useRef<NodeJS.Timeout | null>(null);

  const location = selectActiveLocation({
    automaticLocation,
    manualLocation: preferences.manualLocation,
    mode: preferences.locationMode,
  });
  const addressLines = createAddressLines(
    location?.address ?? null,
    location?.latitude ?? null,
    location?.longitude ?? null,
  );

  useEffect(() => {
    (async () => {
      try {
        if (!cameraPermission?.granted) {
          await requestCameraPermission();
        }
      } catch (_error) {
        setLocationError("Unable to request camera access.");
      }
    })();
  }, [cameraPermission?.granted, requestCameraPermission]);

  const updateLocationMetadata = async (loc: Location.LocationObject) => {
    setLocationError(null);
    const remoteAddress = await fetchRemoteLocationAddress(
      loc.coords.latitude,
      loc.coords.longitude,
    );
    let address = remoteAddress;
    if (!address) {
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        address = buildAddressFromExpo(reverseGeocode[0]);
      } catch (_error) {
        address = null;
      }
    }

    const nextLocation = toAppLocationFromExpo(loc, address);
    setAutomaticLocation(nextLocation);

    try {
      setWeather(
        await fetchWeatherSnapshot(loc.coords.latitude, loc.coords.longitude),
      );
    } catch (_error) {
      setWeather(EMPTY_WEATHER_SNAPSHOT);
    }
  };

  const ensureLocationReady = async (): Promise<boolean> => {
    if (preferences.locationMode === "manual" && preferences.manualLocation) {
      return true;
    }

    try {
      const existing = await Location.getForegroundPermissionsAsync();
      let granted = existing.granted;
      if (!granted) {
        const requested = await Location.requestForegroundPermissionsAsync();
        granted = requested.granted;
      }

      if (!granted) {
        setLocationError("Location permission is required in Camera mode.");
        return false;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setLocationError("Turn on device location services.");
        return false;
      }

      return true;
    } catch (_error) {
      setLocationError("Unable to access location services.");
      return false;
    }
  };

  const fetchPreciseLocation = async () => {
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        mayShowUserSettingsDialog: true,
      });
      await updateLocationMetadata(current);
    } catch (_error) {
      setLocationError("Unable to fetch current location.");
    }
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    let active = true;

    (async () => {
      try {
        const isReady = await ensureLocationReady();
        if (!isReady || !active) return;

        if (preferences.locationMode === "manual" && preferences.manualLocation) {
          setWeather(
            await fetchWeatherSnapshot(
              preferences.manualLocation.latitude,
              preferences.manualLocation.longitude,
            ),
          );
          return;
        }

        const lastKnown = await Location.getLastKnownPositionAsync({
          maxAge: 30_000,
          requiredAccuracy: 150,
        });
        if (lastKnown && active) {
          await updateLocationMetadata(lastKnown);
        }

        if (!active) return;
        await fetchPreciseLocation();

        if (!active) return;
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true,
          },
          (loc) => {
            if (!active) return;
            void updateLocationMetadata(loc);
          },
        );
      } catch (_error) {
        if (active) {
          setLocationError("Unable to keep location tracking active.");
        }
      }
    })();

    return () => {
      active = false;
      subscription?.remove();
    };
  }, [mode, preferences.locationMode, preferences.manualLocation]);

  const refreshLocation = async () => {
    setIsRefreshingLocation(true);
    try {
      const isReady = await ensureLocationReady();
      if (isReady) {
        if (preferences.locationMode === "manual" && preferences.manualLocation) {
          setWeather(
            await fetchWeatherSnapshot(
              preferences.manualLocation.latitude,
              preferences.manualLocation.longitude,
            ),
          );
          setLocationError(null);
          return;
        }
        await fetchPreciseLocation();
      }
    } finally {
      setIsRefreshingLocation(false);
    }
  };

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setRecordingDuration(0);
    }

    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (captureTimerRef.current) {
        clearInterval(captureTimerRef.current);
      }
    };
  }, []);

  const saveMedia = async (uri: string, type: CaptureMode) => {
    const createdAt = Date.now();
    const link = document.createElement("a");
    link.href = uri;
    link.download = buildDownloadFileName(
      preferences.selectedProjectName,
      type,
      createdAt,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addCaptureHistoryItem(
      createCapturedMediaItem(
        uri,
        type,
        preferences.selectedProjectName,
        location?.address?.displayLabel ?? null,
        createdAt,
      ),
    );

    if (preferences.cameraSoundEnabled) {
      playShutterFeedback();
    }

    Alert.alert(
      "Captured",
      `${type === "picture" ? "Photo" : "Video"} downloaded!`,
    );
  };

  const captureImage = async () => {
    if (!viewShotRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const uri = await viewShotRef.current.capture?.();
      if (uri) await saveMedia(uri, "picture");
    } catch (_error) {
      Alert.alert("Error", "Could not capture image.");
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsCapturing(false);
      setIsRecording(false);
      cameraRef.current?.stopRecording();
      return;
    }

    if (!cameraRef.current) return;
    try {
      setIsCapturing(true);
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      if (video) await saveMedia(video.uri, "video");
    } catch (_error) {
      setIsRecording(false);
      setIsCapturing(false);
    }
  };

  const startCountdown = (onComplete: () => void) => {
    if (preferences.timerSeconds === 0) {
      onComplete();
      return;
    }

    setCountdownRemaining(preferences.timerSeconds);
    captureTimerRef.current = setInterval(() => {
      setCountdownRemaining((current) => {
        if (current === null || current <= 1) {
          if (captureTimerRef.current) {
            clearInterval(captureTimerRef.current);
            captureTimerRef.current = null;
          }
          onComplete();
          return null;
        }

        return current - 1;
      });
    }, 1000);
  };

  const handleAction = () => {
    if (isRecording) {
      void toggleRecording();
      return;
    }

    startCountdown(() => {
      if (mode === "picture") {
        void captureImage();
        return;
      }

      void toggleRecording();
    });
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  const toggleDualMode = () => {
    setIsDualMode((prev) => !prev);
  };

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    cameraPermission,
    locationPermission,
    location,
    addressLines,
    weather,
    locationError,
    countdownRemaining,
    isRefreshingLocation,
    facing,
    flash,
    isDualMode,
    isCapturing,
    isRecording,
    recordingDuration,
    viewShotRef,
    cameraRef,
    dateStr,
    timeStr,
    refreshLocation,
    handleAction,
    toggleCameraFacing,
    toggleFlash,
    toggleDualMode,
    formatDuration,
    stampConfig: preferences.stampConfig,
    selectedProjectName: preferences.selectedProjectName,
    locationMode: preferences.locationMode,
  };
}
