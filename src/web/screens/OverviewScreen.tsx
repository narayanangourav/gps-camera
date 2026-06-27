import { AppLocation } from "../../models/location.model";
import OsmMap from "../components/OsmMap";

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
}: OverviewScreenProps) {
  return (
    <section className="overview-screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">Overview</p>
          <h1 className="screen-title">Current Location</h1>
        </div>
        <button className="app-secondary-button" onClick={onOpenSettings} type="button">
          Settings
        </button>
      </header>

      <div className="overview-grid">
        <article className="app-card overview-status-card">
          <div className="app-card-header">
            <h2 className="app-card-title">GPS status</h2>
            <button
              className="app-text-button"
              onClick={onRefreshLocation}
              type="button"
            >
              Refresh
            </button>
          </div>
          {loading ? <p className="app-muted-text">Fetching location...</p> : null}
          {permissionDenied ? (
            <p className="app-warning-text">
              Browser location permission is required for automatic mode.
            </p>
          ) : null}
          {error ? <p className="app-warning-text">{error}</p> : null}
          {location ? (
            <div className="overview-meta-stack">
              <div className="app-pill-group">
                <span className="app-pill">{location.source}</span>
                {location.accuracy !== null ? (
                  <span className="app-pill">{Math.round(location.accuracy)} m</span>
                ) : null}
              </div>
              <p className="overview-coordinate-text">
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </p>
              {location.address?.displayLabel ? (
                <p className="app-muted-text">{location.address.displayLabel}</p>
              ) : (
                <p className="app-muted-text">Address not available yet.</p>
              )}
            </div>
          ) : null}
          <div className="app-action-row">
            <button className="app-primary-button" onClick={onOpenCamera} type="button">
              Open Camera
            </button>
            <button
              className="app-secondary-button"
              onClick={onOpenLocationSettings}
              type="button"
            >
              Location Mode
            </button>
          </div>
        </article>

        <article className="app-card overview-map-card">
          <div className="app-card-header">
            <h2 className="app-card-title">Map preview</h2>
            <button className="app-text-button" onClick={onOpenMap} type="button">
              Full map
            </button>
          </div>
          {location ? (
            <div className="overview-map-shell">
              <OsmMap
                latitude={location.latitude}
                longitude={location.longitude}
                markerLatitude={location.latitude}
                markerLongitude={location.longitude}
                zoom={15}
              />
            </div>
          ) : (
            <p className="app-muted-text">
              The map preview appears once a location is available.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
