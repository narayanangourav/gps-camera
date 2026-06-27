import { useLocationSettingsForm } from "../hooks/useLocationSettingsForm";
import { AppPreferences } from "../../models/preferences.model";

type LocationSettingsScreenProps = {
  onBack: () => void;
  preferences: AppPreferences;
  setLocationMode: (mode: AppPreferences["locationMode"]) => void;
  setManualLocation: (location: AppPreferences["manualLocation"]) => void;
};

export default function LocationSettingsScreen({
  onBack,
  preferences,
  setLocationMode,
  setManualLocation,
}: LocationSettingsScreenProps) {
  const logic = useLocationSettingsForm({
    preferences,
    setLocationMode,
    setManualLocation,
  });

  return (
    <section className="form-screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">Location</p>
          <h1 className="screen-title">Location Settings</h1>
        </div>
        <button className="app-secondary-button" onClick={onBack} type="button">
          Back
        </button>
      </header>

      <div className="form-grid">
        <article className="app-card">
          <h2 className="app-card-title">Mode</h2>
          <p className="app-muted-text">{logic.subtitle}</p>
          <div className="form-mode-row">
            <button
              className={`form-mode-button ${logic.locationMode === "automatic" ? "is-active" : ""}`.trim()}
              onClick={logic.setAutomaticMode}
              type="button"
            >
              Automatic
            </button>
            <button
              className={`form-mode-button ${logic.locationMode === "manual" ? "is-active" : ""}`.trim()}
              onClick={logic.setManualMode}
              type="button"
            >
              Manual
            </button>
          </div>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Manual coordinates</h2>
          <div className="form-stack">
            <input
              className="form-input"
              onChange={(event) => logic.setLatitude(event.target.value)}
              placeholder="Latitude"
              value={logic.latitude}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setLongitude(event.target.value)}
              placeholder="Longitude"
              value={logic.longitude}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setAddressLine1(event.target.value)}
              placeholder="Address line 1"
              value={logic.addressLine1}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setAddressLine2(event.target.value)}
              placeholder="Address line 2"
              value={logic.addressLine2}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setCity(event.target.value)}
              placeholder="City"
              value={logic.city}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setState(event.target.value)}
              placeholder="State"
              value={logic.state}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setCountry(event.target.value)}
              placeholder="Country"
              value={logic.country}
            />
            <input
              className="form-input"
              onChange={(event) => logic.setPostalCode(event.target.value)}
              placeholder="Postal code"
              value={logic.postalCode}
            />
            {logic.error ? <p className="app-warning-text">{logic.error}</p> : null}
            <div className="app-action-row">
              <button
                className="app-primary-button"
                onClick={() => {
                  if (logic.save()) {
                    onBack();
                  }
                }}
                type="button"
              >
                Save Manual Location
              </button>
              <button
                className="app-secondary-button"
                onClick={logic.clearManualLocation}
                type="button"
              >
                Clear
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
