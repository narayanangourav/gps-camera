import { AppPreferences } from "../../models/preferences.model";
import { useStampSettingsForm } from "../hooks/useStampSettingsForm";

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
    <section className="form-screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">Capture</p>
          <h1 className="screen-title">Stamp Settings</h1>
        </div>
        <button className="app-secondary-button" onClick={onBack} type="button">
          Back
        </button>
      </header>

      <div className="form-grid">
        <article className="app-card">
          <h2 className="app-card-title">Timer</h2>
          <div className="form-chip-row">
            {logic.timerOptions.map((option) => (
              <button
                key={option}
                className={`form-chip ${logic.timerSeconds === option ? "is-active" : ""}`.trim()}
                onClick={() => logic.setTimerSeconds(option)}
                type="button"
              >
                {option === 0 ? "Off" : `${option}s`}
              </button>
            ))}
          </div>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Feedback</h2>
          <button
            className="app-secondary-button"
            onClick={logic.toggleCameraSound}
            type="button"
          >
            {logic.cameraSoundEnabled ? "Disable sound" : "Enable sound"}
          </button>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Project naming</h2>
          <div className="form-chip-row">
            {logic.quickProjectNames.map((name) => (
              <button
                key={name}
                className={`form-chip ${logic.selectedProjectName === name ? "is-active" : ""}`.trim()}
                onClick={() => logic.applyProjectName(name)}
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
          <div className="form-stack">
            <input
              className="form-input"
              onChange={(event) => logic.setCustomProjectName(event.target.value)}
              placeholder="Custom project name"
              value={logic.customProjectName}
            />
            <button
              className="app-secondary-button"
              onClick={() => logic.applyProjectName(logic.customProjectName)}
              type="button"
            >
              Apply Project Name
            </button>
          </div>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Visible stamp fields</h2>
          <div className="form-stack">
            {logic.stampFields.map((field) => (
              <button
                key={field.key}
                className="form-toggle-row"
                onClick={() => logic.toggleStampField(field.key)}
                type="button"
              >
                <span>{field.label}</span>
                <span>{field.enabled ? "On" : "Off"}</span>
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
