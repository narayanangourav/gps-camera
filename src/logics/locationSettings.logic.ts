import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

import { useAppPreferences } from "../state/AppPreferencesProvider";
import { createManualLocation } from "../services/location.service";

export const useLocationSettingsLogic = () => {
  const navigation = useNavigation<any>();
  const { preferences, setLocationMode, setManualLocation } = useAppPreferences();
  const [latitude, setLatitude] = useState(
    preferences.manualLocation?.latitude.toString() ?? "",
  );
  const [longitude, setLongitude] = useState(
    preferences.manualLocation?.longitude.toString() ?? "",
  );
  const [addressLine1, setAddressLine1] = useState(
    preferences.manualLocation?.address?.line1 ?? "",
  );
  const [addressLine2, setAddressLine2] = useState(
    preferences.manualLocation?.address?.line2 ?? "",
  );
  const [city, setCity] = useState(preferences.manualLocation?.address?.city ?? "");
  const [state, setState] = useState(
    preferences.manualLocation?.address?.state ?? "",
  );
  const [country, setCountry] = useState(
    preferences.manualLocation?.address?.country ?? "",
  );
  const [postalCode, setPostalCode] = useState(
    preferences.manualLocation?.address?.postalCode ?? "",
  );

  const subtitle = useMemo(
    () =>
      preferences.locationMode === "manual"
        ? "Manual coordinates will be used in the camera overlay."
        : "Browser geolocation will be used in the camera overlay.",
    [preferences.locationMode],
  );

  const saveManualLocation = () => {
    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);
    const manualLocation = createManualLocation({
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    });

    if (!manualLocation) {
      Alert.alert(
        "Invalid Coordinates",
        "Latitude must be between -90 and 90, and longitude must be between -180 and 180.",
      );
      return;
    }

    setManualLocation(manualLocation);
    setLocationMode("manual");
    navigation.goBack();
  };

  return {
    subtitle,
    locationMode: preferences.locationMode,
    latitude,
    longitude,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    setAutomaticMode: () => setLocationMode("automatic"),
    setManualMode: () => setLocationMode("manual"),
    clearManualLocation: () => {
      setManualLocation(null);
      setLocationMode("automatic");
    },
    saveManualLocation,
    setLatitude,
    setLongitude,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setState,
    setCountry,
    setPostalCode,
    goBack: () => navigation.goBack(),
  };
};
