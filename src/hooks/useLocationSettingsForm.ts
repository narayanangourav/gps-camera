import { useMemo, useState } from "react";

import { AppPreferences } from "../models/preferences.model";
import { createManualLocation } from "../services/location.service";

type UseLocationSettingsFormOptions = {
  preferences: AppPreferences;
  setLocationMode: (mode: AppPreferences["locationMode"]) => void;
  setManualLocation: (location: AppPreferences["manualLocation"]) => void;
};

export const useLocationSettingsForm = ({
  preferences,
  setLocationMode,
  setManualLocation,
}: UseLocationSettingsFormOptions) => {
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
  const [error, setError] = useState<string | null>(null);

  const subtitle = useMemo(
    () =>
      preferences.locationMode === "manual"
        ? "Manual coordinates are active for capture and map screens."
        : "Browser geolocation is active for capture and map screens.",
    [preferences.locationMode],
  );

  const save = () => {
    const manualLocation = createManualLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    });

    if (!manualLocation) {
      setError(
        "Latitude must be between -90 and 90, and longitude must be between -180 and 180.",
      );
      return false;
    }

    setManualLocation(manualLocation);
    setLocationMode("manual");
    setError(null);
    return true;
  };

  const setManualMode = () => {
    if (!preferences.manualLocation) {
      setError("Save manual coordinates before switching to manual mode.");
      return;
    }

    setLocationMode("manual");
    setError(null);
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
    error,
    setLatitude,
    setLongitude,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setState,
    setCountry,
    setPostalCode,
    setAutomaticMode: () => setLocationMode("automatic"),
    setManualMode,
    clearManualLocation: () => {
      setManualLocation(null);
      setLocationMode("automatic");
      setError(null);
    },
    save,
  };
};
