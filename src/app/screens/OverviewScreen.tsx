import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppLocation } from "../../models/location.model";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import IconButton from "../../components/ui/IconButton";
import PageFrame from "../../components/ui/PageFrame";
import PageShell from "../../components/ui/PageShell";
import Pill from "../../components/ui/Pill";
import SectionHeader from "../../components/ui/SectionHeader";
import OsmMap from "../../components/maps/OsmMap";

import styles from "./OverviewScreen.module.css";
import { AppPreferences } from "../../models/preferences.model";

type OverviewScreenProps = {
  error: string | null;
  loading: boolean;
  location: AppLocation | null;
  onOpenCamera: () => void;
  onOpenLocationSettings: () => void;
  onOpenMap: () => void;
  onOpenSettings: () => void;
  onRefreshLocation: () => void;
  permissionDenied: boolean;
  locationMode: AppPreferences["locationMode"];
};

export default function OverviewScreen({
  error,
  loading,
  location,
  onOpenCamera,
  onOpenLocationSettings,
  onOpenMap,
  onOpenSettings,
  onRefreshLocation,
  permissionDenied,
  locationMode,
}: OverviewScreenProps) {
  const showManualFallbackAction =
    locationMode === "automatic" && !loading && (!location || permissionDenied || Boolean(error));
  const locationPreview = location ?? {
    latitude: 0,
    longitude: 0,
    accuracy: null,
    address: null,
    source: locationMode,
  };
  const shouldRenderFallbackMap = locationMode === "automatic" && !location;

  return (
    <PageShell fullHeight inset="compact">
      <PageFrame className={`${styles.frame} px-5 py-6 sm:px-8 sm:py-8`} fullHeight>
        <SectionHeader
          actions={
            <IconButton
              className="text-slate-700"
              id="overview-settings-button"
              label="Open settings"
              onClick={onOpenSettings}
            >
              <SettingsIcon className="h-7 w-7" fontSize="inherit" />
            </IconButton>
          }
          eyebrow="Overview"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="m-0 text-lg font-semibold text-slate-950">GPS status</h2>
              <IconButton
                className="ml-auto text-app-primary"
                id="overview-refresh-button"
                label="Refresh location"
                onClick={onRefreshLocation}
              >
                <RefreshIcon
                  className={`h-[1.35rem] w-[1.35rem] ${loading ? styles.refreshIconSpinning : ""}`.trim()}
                  fontSize="inherit"
                />
              </IconButton>
            </div>
            {loading ? <p className="text-base leading-7 text-app-muted">Fetching location...</p> : null}
            {permissionDenied ? (
              <p className="text-base leading-7 text-amber-700">
                Browser location permission is required for automatic mode.
              </p>
            ) : null}
            {error ? <p className="text-base leading-7 text-amber-700">{error}</p> : null}
            <div className="grid gap-3">
              {locationPreview.accuracy !== null ? (
                <div className="flex flex-wrap gap-2">
                  <Pill className="w-auto min-w-24">
                    {Math.round(locationPreview.accuracy)} m
                  </Pill>
                </div>
              ) : null}
              <p className="m-0 text-lg font-semibold text-slate-950 sm:text-xl">
                {locationPreview.latitude.toFixed(6)}, {locationPreview.longitude.toFixed(6)}
              </p>
              {locationPreview.address?.displayLabel ? (
                <p className="text-base leading-7 text-app-muted">
                  {locationPreview.address.displayLabel}
                </p>
              ) : (
                <p className="text-base leading-7 text-app-muted">Address not available yet.</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button block className="sm:w-auto" onClick={onOpenCamera} variant="primary">
                Open Camera
              </Button>
              {showManualFallbackAction ? (
                <Button block className="sm:w-auto" onClick={onOpenLocationSettings}>
                  Enter Manual Location
                </Button>
              ) : null}
            </div>
          </Card>

          <Card className="flex min-h-[24rem] flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="m-0 text-lg font-semibold text-slate-950">Map preview</h2>
              <IconButton
                className="ml-auto text-app-primary"
                label="Open full map"
                onClick={onOpenMap}
              >
                <FullscreenIcon className="h-7 w-7" fontSize="inherit" />
              </IconButton>
            </div>
            {location || shouldRenderFallbackMap ? (
              <div className={`${styles.mapShell} h-[18rem] rounded-[1.125rem] sm:h-[21rem]`}>
                <OsmMap
                  compactAttribution
                  latitude={locationPreview.latitude}
                  longitude={locationPreview.longitude}
                  markerLatitude={locationPreview.latitude}
                  markerLongitude={locationPreview.longitude}
                  zoom={15}
                />
              </div>
            ) : (
              <p className="text-base leading-7 text-app-muted">
                The map preview appears once a location is available.
              </p>
            )}
          </Card>
        </div>
      </PageFrame>
    </PageShell>
  );
}
