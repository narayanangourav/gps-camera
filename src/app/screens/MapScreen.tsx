import { AppLocation } from "../../models/location.model";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageShell from "../../components/ui/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import OsmMap from "../../components/maps/OsmMap";
import { useMapScreenState } from "../../hooks/useMapScreenState";

import styles from "./MapScreen.module.css";

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
    <PageShell className="mx-auto max-w-6xl" inset="regular">
      <SectionHeader
        actions={<Button onClick={onBack}>Back</Button>}
        eyebrow="Map"
        title="Full Map"
      />

      <Card className="flex min-h-[32rem] flex-col gap-4">
        {location ? (
          <div className={`${styles.mapShell} h-[26rem] rounded-[1.125rem] sm:h-[32rem]`}>
            <OsmMap
              latitude={location.latitude}
              longitude={location.longitude}
              markerLatitude={location.latitude}
              markerLongitude={location.longitude}
              zoom={logic.zoom}
            />
          </div>
        ) : (
          <p className="text-base leading-7 text-app-muted">Location not available yet.</p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button onClick={logic.zoomIn}>
            Zoom In
          </Button>
          <Button onClick={logic.zoomOut}>
            Zoom Out
          </Button>
          {automaticLocation ? (
            <Button onClick={onUseCurrentAsManual} variant="primary">
              Use Current For Manual
            </Button>
          ) : null}
        </div>
      </Card>
    </PageShell>
  );
}
