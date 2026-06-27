import { AppPreferencesProvider, useAppPreferences } from "../state/AppPreferencesProvider";
import HomeScreen from "./screens/HomeScreen";
import OverviewScreen from "./screens/OverviewScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LocationSettingsScreen from "./screens/LocationSettingsScreen";
import StampSettingsScreen from "./screens/StampSettingsScreen";
import CaptureHistoryScreen from "./screens/CaptureHistoryScreen";
import MapScreen from "./screens/MapScreen";
import CameraScreen from "./screens/CameraScreen";
import { useHashRoute } from "./hooks/useHashRoute";
import { useLiveLocation } from "./hooks/useLiveLocation";
import { CAMERA_TIMER_OPTIONS } from "../services/stamp.service";

function AppShell() {
  const {
    preferences,
    captureHistory,
    setCameraSoundEnabled,
    setLocationMode,
    setManualLocation,
    setSelectedProjectName,
    setTimerSeconds,
    updateStampConfig,
    addCaptureHistoryItem,
    removeCaptureHistoryItem,
    clearCaptureHistory,
  } = useAppPreferences();
  const { route, navigate } = useHashRoute();
  const locationState = useLiveLocation(preferences);

  const cycleTimer = () => {
    const currentIndex = CAMERA_TIMER_OPTIONS.indexOf(preferences.timerSeconds);
    const nextValue =
      CAMERA_TIMER_OPTIONS[(currentIndex + 1) % CAMERA_TIMER_OPTIONS.length];
    setTimerSeconds(nextValue);
  };

  const useCurrentAsManual = () => {
    if (!locationState.automaticLocation) {
      return;
    }

    setManualLocation({
      ...locationState.automaticLocation,
      source: "manual",
    });
    setLocationMode("manual");
  };

  return (
    <main className="app-shell">
      {route === "home" ? (
        <HomeScreen onOpenOverview={() => navigate("overview")} />
      ) : null}

      {route === "overview" ? (
        <OverviewScreen
          error={locationState.error}
          loading={locationState.loading}
          location={locationState.selectedLocation}
          onOpenCamera={() => navigate("camera")}
          onOpenLocationSettings={() => navigate("location-settings")}
          onOpenMap={() => navigate("map")}
          onOpenSettings={() => navigate("settings")}
          onRefreshLocation={() => void locationState.refresh()}
          permissionDenied={locationState.permissionDenied}
        />
      ) : null}

      {route === "camera" ? (
        <CameraScreen
          addCaptureHistoryItem={addCaptureHistoryItem}
          location={locationState.selectedLocation}
          onBack={() => navigate("overview")}
          onRefreshLocation={() => void locationState.refresh()}
          preferences={preferences}
          weather={locationState.weather}
        />
      ) : null}

      {route === "settings" ? (
        <SettingsScreen
          captureCount={captureHistory.length}
          onBack={() => navigate("overview")}
          onCycleTimer={cycleTimer}
          onOpenHistory={() => navigate("capture-history")}
          onOpenLocation={() => navigate("location-settings")}
          onOpenMap={() => navigate("map")}
          onOpenStamp={() => navigate("stamp-settings")}
          onToggleSound={() =>
            setCameraSoundEnabled(!preferences.cameraSoundEnabled)
          }
          preferences={preferences}
        />
      ) : null}

      {route === "location-settings" ? (
        <LocationSettingsScreen
          onBack={() => navigate("settings")}
          preferences={preferences}
          setLocationMode={setLocationMode}
          setManualLocation={setManualLocation}
        />
      ) : null}

      {route === "stamp-settings" ? (
        <StampSettingsScreen
          onBack={() => navigate("settings")}
          preferences={preferences}
          setCameraSoundEnabled={setCameraSoundEnabled}
          setSelectedProjectName={setSelectedProjectName}
          setTimerSeconds={setTimerSeconds}
          updateStampConfig={updateStampConfig}
        />
      ) : null}

      {route === "capture-history" ? (
        <CaptureHistoryScreen
          captureHistory={captureHistory}
          clearCaptureHistory={clearCaptureHistory}
          onBack={() => navigate("settings")}
          removeCaptureHistoryItem={removeCaptureHistoryItem}
        />
      ) : null}

      {route === "map" ? (
        <MapScreen
          automaticLocation={locationState.automaticLocation}
          location={locationState.selectedLocation}
          onBack={() => navigate("overview")}
          onUseCurrentAsManual={useCurrentAsManual}
        />
      ) : null}
    </main>
  );
}

export default function App() {
  return (
    <AppPreferencesProvider>
      <AppShell />
    </AppPreferencesProvider>
  );
}
