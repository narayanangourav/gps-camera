import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAppPreferences } from "../state/AppPreferencesProvider";
import {
  buildAddressFromExpo,
  formatLocationAddress,
  selectActiveLocation,
  toAppLocationFromExpo,
} from "../services/location.service";
import {
  MapCoordinate,
  MapRegion,
  TARGET_ACCURACY_METERS,
  toRegion,
} from "./functions.logic";

export function useOverviewLogic() {
  const navigation = useNavigation<any>();
  const { preferences } = useAppPreferences();
  const [automaticLocation, setAutomaticLocation] = useState<ReturnType<
    typeof toAppLocationFromExpo
  > | null>(null);
  const [region, setRegion] = useState<MapRegion | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [automaticLocationError, setAutomaticLocationError] = useState<string | null>(null);
  const [isRecentering, setIsRecentering] = useState(false);
  const followUserRef = useRef(true);

  const location = selectActiveLocation({
    automaticLocation,
    manualLocation: preferences.manualLocation,
    mode: preferences.locationMode,
  });
  const locationError =
    preferences.locationMode === "manual" && preferences.manualLocation
      ? null
      : automaticLocationError;
  const addressText = formatLocationAddress(location?.address ?? null);

  const updateFollowUser = (next: boolean) => {
    followUserRef.current = next;
  };

  const applyAutomaticLocation = useCallback(async (next: Location.LocationObject) => {
    const appLocation = toAppLocationFromExpo(next);
    setAutomaticLocation(appLocation);
    setRegion((prev) =>
      toRegion(
        {
          latitude: appLocation.latitude,
          longitude: appLocation.longitude,
        },
        prev,
      ),
    );
  }, []);

  const resolveAddress = useCallback(async (coords: MapCoordinate) => {
    try {
      const places = await Location.reverseGeocodeAsync(coords);
      const address = buildAddressFromExpo(places[0]);
      setAutomaticLocation((current) =>
        current
          ? {
              ...current,
              address,
            }
          : current,
      );
    } catch (_error) {
      // Keep the previous address if reverse geocoding fails.
    }
  }, []);

  useEffect(() => {
    const manualLocation = preferences.manualLocation;

    if (preferences.locationMode === "manual" && manualLocation) {
      setRegion((prev) =>
        toRegion(
          {
            latitude: manualLocation.latitude,
            longitude: manualLocation.longitude,
          },
          prev,
        ),
      );
      setLoading(false);
    }
  }, [preferences.locationMode, preferences.manualLocation]);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationPermissionDenied(true);
          return;
        }

        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setAutomaticLocationError("Turn on device location services for better accuracy.");
          return;
        }

        const lastKnown = await Location.getLastKnownPositionAsync({
          maxAge: 15_000,
          requiredAccuracy: 100,
        });
        if (lastKnown) {
          await applyAutomaticLocation(lastKnown);
          void resolveAddress(lastKnown.coords);
        }

        try {
          const current = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
            mayShowUserSettingsDialog: true,
          });
          setAutomaticLocationError(null);
          await applyAutomaticLocation(current);
          void resolveAddress(current.coords);
        } catch (_error) {
          setAutomaticLocationError("Unable to get your current GPS fix.");
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1500,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true,
          },
          (next) => {
            setAutomaticLocationError(null);
            setAutomaticLocation((current) => ({
              ...(current ?? toAppLocationFromExpo(next)),
              ...toAppLocationFromExpo(next),
              address: current?.address ?? null,
            }));
            if (followUserRef.current) {
              setRegion((prev) =>
                toRegion(
                  {
                    latitude: next.coords.latitude,
                    longitude: next.coords.longitude,
                  },
                  prev,
                ),
              );
            }
          },
        );
      } catch (_error) {
        setAutomaticLocationError("Unable to access location services.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      subscription?.remove();
    };
  }, [applyAutomaticLocation, resolveAddress]);

  const markerCoordinate: MapCoordinate | null = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
      }
    : null;

  const zoomBy = (factor: number) => {
    setRegion((prev) => {
      if (!prev) return prev;
      const shouldFollow = followUserRef.current && markerCoordinate;
      const baseLat = shouldFollow ? markerCoordinate.latitude : prev.latitude;
      const baseLon = shouldFollow ? markerCoordinate.longitude : prev.longitude;
      const nextLat = Math.min(Math.max(prev.latitudeDelta * factor, 0.0005), 0.5);
      const nextLon = Math.min(Math.max(prev.longitudeDelta * factor, 0.0005), 0.5);
      return {
        latitude: baseLat,
        longitude: baseLon,
        latitudeDelta: nextLat,
        longitudeDelta: nextLon,
      };
    });
  };

  const zoomIn = () => zoomBy(0.5);
  const zoomOut = () => zoomBy(2);

  const recenterToLocation = async () => {
    updateFollowUser(true);
    setIsRecentering(true);
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setAutomaticLocationError("Turn on device location services for better accuracy.");
        return;
      }

      const manualLocation = preferences.manualLocation;
      if (preferences.locationMode === "manual" && manualLocation) {
        setRegion((prev) =>
          toRegion(
            {
              latitude: manualLocation.latitude,
              longitude: manualLocation.longitude,
            },
            prev,
          ),
        );
        return;
      }

      const fresh = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        mayShowUserSettingsDialog: true,
      });

      setAutomaticLocationError(null);
      await applyAutomaticLocation(fresh);
      await resolveAddress(fresh.coords);
    } catch (_error) {
      setAutomaticLocationError("Unable to refresh exact location.");
    } finally {
      setIsRecentering(false);
    }
  };

  const handleUserGesture = () => {
    if (followUserRef.current) {
      updateFollowUser(false);
    }
  };

  const navigateToCamera = () => {
    navigation.navigate("Camera", { mode: "picture" });
  };

  const navigateToVideo = () => {
    navigation.navigate("Camera", { mode: "video" });
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  return {
    location,
    region,
    loading,
    locationPermissionDenied,
    locationError,
    addressText,
    isRecentering,
    markerCoordinate,
    setRegion,
    zoomIn,
    zoomOut,
    recenterToLocation,
    handleUserGesture,
    navigateToCamera,
    navigateToVideo,
    navigateToSettings,
    TARGET_ACCURACY_METERS,
  };
}
