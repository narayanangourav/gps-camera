import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  formatAddress,
  MapCoordinate,
  MapRegion,
  TARGET_ACCURACY_METERS,
  toRegion,
} from "./functions.logic";

export function useOverviewLogic() {
  const navigation = useNavigation<any>();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [region, setRegion] = useState<MapRegion | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [addressText, setAddressText] = useState<string | null>(null);
  const [isRecentering, setIsRecentering] = useState(false);
  const followUserRef = useRef(true);

  const updateFollowUser = (next: boolean) => {
    followUserRef.current = next;
  };

  const resolveAddress = useCallback(async (coords: MapCoordinate) => {
    try {
      const places = await Location.reverseGeocodeAsync(coords);
      setAddressText(formatAddress(places[0]));
    } catch (error) {
      console.log("Reverse geocode error:", error);
    }
  }, []);

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
          setLocationError("Turn on device location services for better accuracy.");
          return;
        }

        const lastKnown = await Location.getLastKnownPositionAsync({
          maxAge: 15_000,
          requiredAccuracy: 100,
        });
        if (lastKnown) {
          setLocation(lastKnown);
          setRegion((prev) => toRegion(lastKnown.coords, prev));
          void resolveAddress(lastKnown.coords);
        }

        try {
          const current = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
            mayShowUserSettingsDialog: true,
          });
          setLocationError(null);
          setLocation(current);
          setRegion((prev) => toRegion(current.coords, prev));
          void resolveAddress(current.coords);
        } catch (error) {
          console.log("Current position error:", error);
          setLocationError("Unable to get your current GPS fix.");
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1500,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true,
          },
          (next) => {
            setLocationError(null);
            setLocation(next);
            if (followUserRef.current) {
              setRegion((prev) => toRegion(next.coords, prev));
            }
          },
        );
      } catch (error) {
        console.log("Location error:", error);
        setLocationError("Unable to access location services.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      subscription?.remove();
    };
  }, [resolveAddress]);

  const markerCoordinate: MapCoordinate | null = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
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
        setLocationError("Turn on device location services for better accuracy.");
        return;
      }

      const fresh = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        mayShowUserSettingsDialog: true,
      });

      setLocationError(null);
      setLocation(fresh);
      setRegion((prev) => toRegion(fresh.coords, prev));
      await resolveAddress(fresh.coords);
    } catch (error) {
      console.log("Recenter location error:", error);
      setLocationError("Unable to refresh exact location.");
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

