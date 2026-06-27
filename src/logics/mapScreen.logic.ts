import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";

import { useAppPreferences } from "../state/AppPreferencesProvider";
import {
  selectActiveLocation,
  toAppLocationFromExpo,
} from "../services/location.service";
import { MapRegion, toRegion } from "./functions.logic";

export const useMapScreenLogic = () => {
  const navigation = useNavigation<any>();
  const { preferences, setManualLocation, setLocationMode } = useAppPreferences();
  const [automaticLocation, setAutomaticLocation] = useState<ReturnType<
    typeof toAppLocationFromExpo
  > | null>(null);
  const activeLocation = selectActiveLocation({
    automaticLocation,
    manualLocation: preferences.manualLocation,
    mode: preferences.locationMode,
  });
  const [region, setRegion] = useState<MapRegion | null>(
    activeLocation
      ? toRegion(
          {
            latitude: activeLocation.latitude,
            longitude: activeLocation.longitude,
          },
          null,
        )
      : null,
  );

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (!permission.granted) {
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          mayShowUserSettingsDialog: true,
        });
        if (!active) {
          return;
        }

        const nextLocation = toAppLocationFromExpo(current);
        setAutomaticLocation(nextLocation);
        if (!region) {
          setRegion(
            toRegion(
              {
                latitude: nextLocation.latitude,
                longitude: nextLocation.longitude,
              },
              null,
            ),
          );
        }
      } catch (_error) {
        // Keep the map on the last known selected location if browser geolocation fails.
      }
    })();

    return () => {
      active = false;
    };
  }, [region]);

  const markerCoordinate = useMemo(
    () =>
      activeLocation
        ? {
            latitude: activeLocation.latitude,
            longitude: activeLocation.longitude,
          }
        : null,
    [activeLocation],
  );

  return {
    region,
    markerCoordinate,
    locationMode: preferences.locationMode,
    canUseCurrentLocation: Boolean(automaticLocation),
    setRegion,
    recenter: () => {
      if (!activeLocation) {
        return;
      }

      setRegion(
        toRegion(
          {
            latitude: activeLocation.latitude,
            longitude: activeLocation.longitude,
          },
          region,
        ),
      );
    },
    useCurrentAsManual: () => {
      if (!automaticLocation) {
        return;
      }

      setManualLocation({
        ...automaticLocation,
        source: "manual",
      });
      setLocationMode("manual");
    },
    goBack: () => navigation.goBack(),
  };
};
