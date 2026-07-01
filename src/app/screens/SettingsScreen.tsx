import { AppPreferences } from "../../models/preferences.model";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageShell from "../../components/ui/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

import styles from "./SettingsScreen.module.css";

type SettingsScreenProps = {
  captureCount: number;
  onBack: () => void;
  onCycleTimer: () => void;
  onOpenHistory: () => void;
  onOpenLocation: () => void;
  onOpenMap: () => void;
  onOpenStamp: () => void;
  onToggleSound: () => void;
  preferences: AppPreferences;
};

export default function SettingsScreen({
  captureCount,
  onBack,
  onCycleTimer,
  onOpenHistory,
  onOpenLocation,
  onOpenMap,
  onOpenStamp,
  onToggleSound,
  preferences,
}: SettingsScreenProps) {
  return (
    <PageShell className="mx-auto max-w-6xl" inset="regular">
      <SectionHeader
        actions={<Button onClick={onBack}>Back</Button>}
        eyebrow="Settings"
        title="Workspace Controls"
      />

      <div className={`${styles.grid} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}>
        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Location mode</h2>
          <p className="text-base leading-7 text-app-muted">
            Current mode: <strong>{preferences.locationMode}</strong>
          </p>
          <Button onClick={onOpenLocation}>
            Manage Location
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Stamp settings</h2>
          <p className="text-base leading-7 text-app-muted">
            Project: <strong>{preferences.selectedProjectName}</strong>
          </p>
          <Button onClick={onOpenStamp}>
            Open Stamp Settings
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Capture timer</h2>
          <p className="text-base leading-7 text-app-muted">
            {preferences.timerSeconds === 0
              ? "Countdown disabled"
              : `${preferences.timerSeconds}s countdown`}
          </p>
          <Button onClick={onCycleTimer}>
            Cycle Timer
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Shutter feedback</h2>
          <p className="text-base leading-7 text-app-muted">
            {preferences.cameraSoundEnabled ? "Enabled" : "Disabled"}
          </p>
          <Button onClick={onToggleSound}>
            Toggle Sound
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Capture history</h2>
          <p className="text-base leading-7 text-app-muted">{captureCount} item(s) in this session.</p>
          <Button onClick={onOpenHistory}>
            Open History
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Full map</h2>
          <p className="text-base leading-7 text-app-muted">Inspect the current or manual location.</p>
          <Button onClick={onOpenMap}>
            Open Map
          </Button>
        </Card>
      </div>
    </PageShell>
  );
}
