import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AppPreferences } from "../../models/preferences.model";
import { AppLocation } from "../../models/location.model";
import {
  fetchRemoteLocationAddress,
  selectActiveLocation,
  toAppLocationFromBrowserPosition,
} from "../../services/location.service";
import {
  EMPTY_WEATHER_SNAPSHOT,
  fetchWeatherSnapshot,
} from "../../services/weather.service";

const toLookupKey = (latitude: number, longitude: number) =>
  `${latitude.toFixed(4)}:${longitude.toFixed(4)}`;

export const useLiveLocation = (preferences: AppPreferences) => {
  const [automaticLocation, setAutomaticLocation] = useState<AppLocation | null>(
    null,
  );
  const [weather, setWeather] = useState(EMPTY_WEATHER_SNAPSHOT);
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastLookupKeyRef = useRef<string | null>(null);

  const hydrateLocationDetails = useCallback(
    async (latitude: number, longitude: number) => {
      const lookupKey = toLookupKey(latitude, longitude);
      if (lastLookupKeyRef.current === lookupKey) {
        return;
      }

      lastLookupKeyRef.current = lookupKey;

      const [address, nextWeather] = await Promise.allSettled([
        fetchRemoteLocationAddress(latitude, longitude),
        fetchWeatherSnapshot(latitude, longitude),
      ]);

      setAutomaticLocation((current) =>
        current
          ? {
              ...current,
              address:
                address.status === "fulfilled" ? address.value : current.address,
            }
          : current,
      );

      setWeather(
        nextWeather.status === "fulfilled"
          ? nextWeather.value
          : EMPTY_WEATHER_SNAPSHOT,
      );
    },
    [],
  );

  const applyAutomaticPosition = useCallback(
    (position: GeolocationPosition) => {
      const nextLocation = toAppLocationFromBrowserPosition({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
        },
        timestamp: position.timestamp,
      });

      setAutomaticLocation((current) => ({
        ...nextLocation,
        address: current?.address ?? null,
      }));
      setPermissionDenied(false);
      setError(null);
      setLoading(false);
      void hydrateLocationDetails(
        position.coords.latitude,
        position.coords.longitude,
      );
    },
    [hydrateLocationDetails],
  );

  const refresh = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not available in this browser.");
      setLoading(false);
      return;
    }

    setLoading(true);

    await new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          applyAutomaticPosition(position);
          resolve();
        },
        (geoError) => {
          setPermissionDenied(geoError.code === geoError.PERMISSION_DENIED);
          setError(
            geoError.code === geoError.PERMISSION_DENIED
              ? "Location permission is required to fetch your position."
              : "Unable to fetch your current location.",
          );
          setLoading(false);
          resolve();
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5_000,
          timeout: 15_000,
        },
      );
    });
  }, [applyAutomaticPosition]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not available in this browser.");
      setLoading(false);
      return;
    }

    void refresh();

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        applyAutomaticPosition(position);
      },
      (geoError) => {
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setPermissionDenied(true);
        }
        setError("Unable to keep location updates active.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3_000,
        timeout: 15_000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [applyAutomaticPosition, refresh]);

  useEffect(() => {
    const manualLocation = preferences.manualLocation;
    if (preferences.locationMode !== "manual" || !manualLocation) {
      return;
    }

    lastLookupKeyRef.current = null;
    void (async () => {
      try {
        setWeather(
          await fetchWeatherSnapshot(
            manualLocation.latitude,
            manualLocation.longitude,
          ),
        );
      } catch (_error) {
        setWeather(EMPTY_WEATHER_SNAPSHOT);
      }
    })();
  }, [preferences.locationMode, preferences.manualLocation]);

  const selectedLocation = useMemo(
    () =>
      selectActiveLocation({
        automaticLocation,
        manualLocation: preferences.manualLocation,
        mode: preferences.locationMode,
      }),
    [automaticLocation, preferences.locationMode, preferences.manualLocation],
  );

  return {
    automaticLocation,
    selectedLocation,
    weather,
    loading,
    permissionDenied,
    error,
    refresh,
  };
};
