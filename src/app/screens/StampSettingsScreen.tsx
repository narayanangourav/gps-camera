import { AppPreferences } from "../../models/preferences.model";
import { useStampSettingsForm } from "../../hooks/useStampSettingsForm";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageShell from "../../components/ui/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

import styles from "./StampSettingsScreen.module.css";

type StampSettingsScreenProps = {
  onBack: () => void;
  preferences: AppPreferences;
  setCameraSoundEnabled: (value: boolean) => void;
  setSelectedProjectName: (value: string) => void;
  setTimerSeconds: (value: AppPreferences["timerSeconds"]) => void;
  updateStampConfig: (config: Partial<AppPreferences["stampConfig"]>) => void;
};

export default function StampSettingsScreen({
  onBack,
  preferences,
  setCameraSoundEnabled,
  setSelectedProjectName,
  setTimerSeconds,
  updateStampConfig,
}: StampSettingsScreenProps) {
  const logic = useStampSettingsForm({
    preferences,
    setTimerSeconds,
    setCameraSoundEnabled,
    setSelectedProjectName,
    updateStampConfig,
  });

  return (
    <PageShell className="mx-auto max-w-6xl" inset="regular">
      <SectionHeader
        actions={<Button onClick={onBack}>Back</Button>}
        eyebrow="Capture"
        title="Stamp Settings"
      />

      <div className={`${styles.grid} grid gap-4 md:grid-cols-2`}>
        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Timer</h2>
          <div className="flex flex-wrap gap-3">
            {logic.timerOptions.map((option) => (
              <Button
                key={option}
                className={logic.timerSeconds === option ? "border-app-primary bg-blue-50 text-app-primary" : ""}
                onClick={() => logic.setTimerSeconds(option)}
              >
                {option === 0 ? "Off" : `${option}s`}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Feedback</h2>
          <Button onClick={logic.toggleCameraSound}>
            {logic.cameraSoundEnabled ? "Disable sound" : "Enable sound"}
          </Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Project naming</h2>
          <div className="flex flex-wrap gap-3">
            {logic.quickProjectNames.map((name) => (
              <Button
                key={name}
                className={logic.selectedProjectName === name ? "border-app-primary bg-blue-50 text-app-primary" : ""}
                onClick={() => logic.applyProjectName(name)}
              >
                {name}
              </Button>
            ))}
          </div>
          <div className="grid gap-3">
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-app-primary"
              onChange={(event) => logic.setCustomProjectName(event.target.value)}
              placeholder="Custom project name"
              value={logic.customProjectName}
            />
            <Button onClick={() => logic.applyProjectName(logic.customProjectName)}>
              Apply Project Name
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h2 className="m-0 text-lg font-semibold text-slate-950">Visible stamp fields</h2>
          <div className="grid gap-3">
            {logic.stampFields.map((field) => (
              <Button
                key={String(field.key)}
                className="justify-between bg-slate-50 text-left"
                onClick={() => logic.toggleStampField(field.key)}
              >
                <span>{field.label}</span>
                <span>{field.enabled ? "On" : "Off"}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
