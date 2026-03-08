import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import ViewShot from "react-native-view-shot";

import { getTileUrl } from "./functions.logic";

type CaptureMode = "picture" | "video";

type AddressLines = {
  line1: string;
  line2: string;
};

const normalizeAddressToken = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const pushUniqueText = (target: string[], value?: string | null) => {
  if (!value) return;
  const trimmed = value.trim();
  if (!trimmed) return;
  const normalized = normalizeAddressToken(trimmed);
  if (!normalized) return;
  const exists = target.some(
    (existing) => normalizeAddressToken(existing) === normalized,
  );
  if (!exists) target.push(trimmed);
};

const buildAddressLinesFromExpo = (
  address: Location.LocationGeocodedAddress | null | undefined,
): AddressLines | null => {
  if (!address) return null;

  const line1Candidates: string[] = [];
  pushUniqueText(
    line1Candidates,
    [address.streetNumber, address.street].filter(Boolean).join(", "),
  );
  pushUniqueText(line1Candidates, address.name);
  const line1 = line1Candidates[0] || null;

  const line2Parts: string[] = [];
  pushUniqueText(line2Parts, address.district);
  pushUniqueText(line2Parts, address.city);
  pushUniqueText(line2Parts, address.region);
  pushUniqueText(line2Parts, address.postalCode);
  pushUniqueText(line2Parts, address.country);
  const line2 = line2Parts.join(", ");

  if (!line1 && !line2) return null;
  return {
    line1: line1 || "Unknown road",
    line2: line2 || "Address unavailable",
  };
};

const buildAddressLinesFromNominatim = (data: any): AddressLines | null => {
  const a = data?.address ?? {};

  const line1Parts: string[] = [];
  pushUniqueText(
    line1Parts,
    [
      a.house_number || a.house || a.building || a.shop,
      a.road || a.residential || a.pedestrian || a.footway || a.path,
    ]
      .filter(Boolean)
      .join(", "),
  );
  pushUniqueText(line1Parts, a.road);
  pushUniqueText(line1Parts, a.residential);
  pushUniqueText(line1Parts, data?.name);
  const line1 = line1Parts[0] || null;

  const line2Parts: string[] = [];
  pushUniqueText(
    line2Parts,
    a.suburb || a.neighbourhood || a.city_district || a.hamlet,
  );
  pushUniqueText(line2Parts, a.city || a.town || a.village);
  pushUniqueText(line2Parts, a.state);
  pushUniqueText(line2Parts, a.postcode);
  pushUniqueText(line2Parts, a.country);
  const line2 = line2Parts.join(", ");

  if (!line1 && !line2) return null;
  return {
    line1: line1 || "Unknown road",
    line2: line2 || "Address unavailable",
  };
};

const buildAddressLinesFromBigData = (data: any): AddressLines | null => {
  const informative = Array.isArray(data?.localityInfo?.informative)
    ? data.localityInfo.informative
    : [];

  const roadInfo = informative.find((item: any) =>
    /road|street|avenue|lane|nagar|main/i.test(
      `${item?.description ?? ""} ${item?.name ?? ""}`,
    ),
  );
  const houseInfo = informative.find((item: any) =>
    /house|building|door|plot/i.test(
      `${item?.description ?? ""} ${item?.name ?? ""}`,
    ),
  );

  const line1Parts: string[] = [];
  pushUniqueText(
    line1Parts,
    [houseInfo?.name, roadInfo?.name].filter(Boolean).join(", "),
  );
  pushUniqueText(line1Parts, roadInfo?.name);
  pushUniqueText(line1Parts, data?.locality);
  const line1 = line1Parts[0] || null;

  const line2Parts: string[] = [];
  pushUniqueText(line2Parts, data?.locality);
  pushUniqueText(line2Parts, data?.city);
  pushUniqueText(line2Parts, data?.principalSubdivision);
  pushUniqueText(line2Parts, data?.postcode);
  pushUniqueText(line2Parts, data?.countryName);
  const line2 = line2Parts.join(", ");

  if (!line1 && !line2) return null;
  return {
    line1: line1 || "Unknown road",
    line2: line2 || "Address unavailable",
  };
};

export function useCameraLogic(mode: CaptureMode) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [addressLines, setAddressLines] = useState<AddressLines | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [isDualMode, setIsDualMode] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const viewShotRef = useRef<ViewShot>(null);
  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      if (!cameraPermission?.granted) await requestCameraPermission();
      if (!locationPermission?.granted) await requestLocationPermission();
      if (!mediaLibraryPermission?.granted) await requestMediaLibraryPermission();
    })();
  }, [mode]);

  const updateLocationMetadata = async (loc: Location.LocationObject) => {
    setLocation(loc);
    setLocationError(null);
    const coordinateLine = `${loc.coords.latitude.toFixed(6)}, ${loc.coords.longitude.toFixed(6)}`;

    if (Platform.OS === "web") {
      try {
        const nominatim = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&addressdetails=1&zoom=18&namedetails=1`,
          { headers: { "Accept-Language": "en" } },
        );
        if (nominatim.ok) {
          const data = await nominatim.json();
          const lines = buildAddressLinesFromNominatim(data);
          if (lines) {
            setAddressLines(lines);
          } else {
            setAddressLines({
              line1: coordinateLine,
              line2: "Address unavailable",
            });
          }
        } else {
          throw new Error("Nominatim reverse geocode failed");
        }
      } catch (_nominatimError) {
        try {
          const bigData = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&localityLanguage=en`,
          );
          if (bigData.ok) {
            const data = await bigData.json();
            const lines = buildAddressLinesFromBigData(data);
            setAddressLines(
              lines || {
                line1: coordinateLine,
                line2: "Address unavailable",
              },
            );
          } else {
            setAddressLines({
              line1: coordinateLine,
              line2: "Address unavailable",
            });
          }
        } catch (_bigDataError) {
          setAddressLines({
            line1: coordinateLine,
            line2: "Address unavailable",
          });
        }
      }
    } else {
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        const lines = buildAddressLinesFromExpo(reverseGeocode[0]);
        setAddressLines(
          lines || {
            line1: coordinateLine,
            line2: "Address unavailable",
          },
        );
      } catch (_error) {
        setAddressLines({
          line1: coordinateLine,
          line2: "Address unavailable",
        });
      }
    }

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&current_weather=true`,
      );
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.log("Weather fetch error", error);
    }
  };

  const ensureLocationReady = async (): Promise<boolean> => {
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

      if (Platform.OS === "android") {
        try {
          await Location.enableNetworkProviderAsync();
        } catch (error) {
          console.log("Network provider not enabled:", error);
        }
      }

      return true;
    } catch (error) {
      console.log("Location readiness error:", error);
      setLocationError("Unable to access location services.");
      return false;
    }
  };

  const fetchPreciseLocation = async () => {
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        mayShowUserSettingsDialog: true,
      });
      await updateLocationMetadata(current);
    } catch (error) {
      console.log("Current camera location error:", error);
      setLocationError("Unable to fetch current location.");
    }
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const isReady = await ensureLocationReady();
      if (!isReady) return;

      const lastKnown = await Location.getLastKnownPositionAsync({
        maxAge: 30_000,
        requiredAccuracy: 150,
      });
      if (lastKnown) {
        await updateLocationMetadata(lastKnown);
      }

      await fetchPreciseLocation();

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 3000,
          distanceInterval: 1,
          mayShowUserSettingsDialog: true,
        },
        (loc) => {
          void updateLocationMetadata(loc);
        },
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, [mode]);

  const refreshLocation = async () => {
    setIsRefreshingLocation(true);
    const isReady = await ensureLocationReady();
    if (isReady) {
      await fetchPreciseLocation();
    }
    setIsRefreshingLocation(false);
  };

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingDuration(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const saveMedia = async (uri: string, type: CaptureMode) => {
    if (Platform.OS === "web") {
      const link = document.createElement("a");
      link.href = uri;
      link.download = `gps_camera_${Date.now()}.${type === "picture" ? "jpg" : "mp4"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Alert.alert(
        "Captured",
        `${type === "picture" ? "Photo" : "Video"} downloaded!`,
      );
      return;
    }

    if (mediaLibraryPermission?.granted) {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert(
        "Saved",
        `${type === "picture" ? "Photo" : "Video"} saved to gallery.`,
      );
    } else {
      Alert.alert(
        "Saved",
        `${type === "picture" ? "Photo" : "Video"} saved to temp storage.`,
      );
    }
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
      // @ts-ignore
      const video = await cameraRef.current.recordAsync({ mute: true });
      if (video) await saveMedia(video.uri, "video");
    } catch (error) {
      console.error("Recording error:", error);
      setIsRecording(false);
      setIsCapturing(false);
    }
  };

  const handleAction = () => {
    if (mode === "picture") {
      void captureImage();
      return;
    }
    void toggleRecording();
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

  const mapTileUrl = useMemo(() => {
    if (!location) return null;
    return getTileUrl(location.coords.latitude, location.coords.longitude, 15);
  }, [location]);

  return {
    cameraPermission,
    locationPermission,
    location,
    addressLines,
    weather,
    locationError,
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
    mapTileUrl,
    refreshLocation,
    handleAction,
    toggleCameraFacing,
    toggleFlash,
    toggleDualMode,
    formatDuration,
  };
}
