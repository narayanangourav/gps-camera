import { AppLocation } from "../../models/location.model";
import OsmMap from "../components/OsmMap";
import { useMapScreenState } from "../hooks/useMapScreenState";

type MapScreenProps = {
  automaticLocation: AppLocation | null;
  location: AppLocation | null;
  onBack: () => void;
  onUseCurrentAsManual: () => void;
};

export default function MapScreen({
  automaticLocation,
  location,
  onBack,
  onUseCurrentAsManual,
}: MapScreenProps) {
  const logic = useMapScreenState(location);

  return (
    <section className="map-screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">Map</p>
          <h1 className="screen-title">Full Map</h1>
        </div>
        <button className="app-secondary-button" onClick={onBack} type="button">
          Back
        </button>
      </header>

      <article className="app-card map-screen-card">
        {location ? (
          <div className="map-screen-shell">
            <OsmMap
              latitude={location.latitude}
              longitude={location.longitude}
              markerLatitude={location.latitude}
              markerLongitude={location.longitude}
              zoom={logic.zoom}
            />
          </div>
        ) : (
          <p className="app-muted-text">Location not available yet.</p>
        )}
        <div className="app-action-row">
          <button className="app-secondary-button" onClick={logic.zoomIn} type="button">
            Zoom In
          </button>
          <button className="app-secondary-button" onClick={logic.zoomOut} type="button">
            Zoom Out
          </button>
          {automaticLocation ? (
            <button
              className="app-primary-button"
              onClick={onUseCurrentAsManual}
              type="button"
            >
              Use Current For Manual
            </button>
          ) : null}
        </div>
      </article>
    </section>
  );
}
