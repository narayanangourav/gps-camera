import { useLocationSettingsForm } from "../../hooks/useLocationSettingsForm";
import { AppPreferences } from "../../models/preferences.model";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageShell from "../../components/ui/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

import styles from "./LocationSettingsScreen.module.css";

type LocationSettingsScreenProps = {
  isAutomaticFallback?: boolean;
  onBack: () => void;
  preferences: AppPreferences;
  setLocationMode: (mode: AppPreferences["locationMode"]) => void;
  setManualLocation: (location: AppPreferences["manualLocation"]) => void;
};

export default function LocationSettingsScreen({
  isAutomaticFallback = false,
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

  const eyebrow = isAutomaticFallback ? "Location Fallback" : "Location";
  const title = isAutomaticFallback ? "Enter Manual Location" : "Location Settings";
  const modeTitle = isAutomaticFallback ? "Automatic location unavailable" : "Mode";
  const formDescription = isAutomaticFallback
    ? "Automatic detection is unavailable right now. Enter manual coordinates to keep the camera and map flows working."
    : "Use this manual location form whenever automatic detection is not found or not allowed.";

  return (
    <PageShell className="mx-auto max-w-6xl" inset="regular">
      <SectionHeader
        actions={<Button onClick={onBack}>Back</Button>}
        eyebrow={eyebrow}
        title={title}
      />

      <div
        className={`${styles.grid} grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`}
      >
        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">{modeTitle}</h2>
          <p className="text-base leading-7 text-app-muted">{logic.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className={logic.locationMode === "automatic" ? "border-app-primary bg-blue-50 text-app-primary" : ""}
              onClick={logic.setAutomaticMode}
            >
              Automatic
            </Button>
            <Button
              className={logic.locationMode === "manual" ? "border-app-primary bg-blue-50 text-app-primary" : ""}
              onClick={logic.setManualMode}
            >
              Manual
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Manual coordinates</h2>
          <p className="text-base leading-7 text-app-muted">{formDescription}</p>
          <div className="grid gap-3">
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setLatitude(event.target.value)}
              placeholder="Latitude"
              value={logic.latitude}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setLongitude(event.target.value)}
              placeholder="Longitude"
              value={logic.longitude}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setAddressLine1(event.target.value)}
              placeholder="Address line 1"
              value={logic.addressLine1}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setAddressLine2(event.target.value)}
              placeholder="Address line 2"
              value={logic.addressLine2}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setCity(event.target.value)}
              placeholder="City"
              value={logic.city}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setState(event.target.value)}
              placeholder="State"
              value={logic.state}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setCountry(event.target.value)}
              placeholder="Country"
              value={logic.country}
            />
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setPostalCode(event.target.value)}
              placeholder="Postal code"
              value={logic.postalCode}
            />
            {logic.error ? <p className="text-base leading-7 text-amber-700">{logic.error}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                block
                className="sm:w-auto"
                onClick={() => {
                  if (logic.save()) {
                    onBack();
                  }
                }}
                variant="primary"
              >
                Save Manual Location
              </Button>
              <Button block className="sm:w-auto" onClick={logic.clearManualLocation}>
                Clear
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
