import { AppPreferences } from "../../models/preferences.model";

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
    <section className="settings-screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">Settings</p>
          <h1 className="screen-title">Workspace Controls</h1>
        </div>
        <button className="app-secondary-button" onClick={onBack} type="button">
          Back
        </button>
      </header>

      <div className="settings-grid">
        <article className="app-card">
          <h2 className="app-card-title">Location mode</h2>
          <p className="app-muted-text">
            Current mode: <strong>{preferences.locationMode}</strong>
          </p>
          <button className="app-secondary-button" onClick={onOpenLocation} type="button">
            Manage Location
          </button>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Stamp settings</h2>
          <p className="app-muted-text">
            Project: <strong>{preferences.selectedProjectName}</strong>
          </p>
          <button className="app-secondary-button" onClick={onOpenStamp} type="button">
            Open Stamp Settings
          </button>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Capture timer</h2>
          <p className="app-muted-text">
            {preferences.timerSeconds === 0
              ? "Countdown disabled"
              : `${preferences.timerSeconds}s countdown`}
          </p>
          <button className="app-secondary-button" onClick={onCycleTimer} type="button">
            Cycle Timer
          </button>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Shutter feedback</h2>
          <p className="app-muted-text">
            {preferences.cameraSoundEnabled ? "Enabled" : "Disabled"}
          </p>
          <button className="app-secondary-button" onClick={onToggleSound} type="button">
            Toggle Sound
          </button>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Capture history</h2>
          <p className="app-muted-text">{captureCount} item(s) in this session.</p>
          <button className="app-secondary-button" onClick={onOpenHistory} type="button">
            Open History
          </button>
        </article>

        <article className="app-card">
          <h2 className="app-card-title">Full map</h2>
          <p className="app-muted-text">Inspect the current or manual location.</p>
          <button className="app-secondary-button" onClick={onOpenMap} type="button">
            Open Map
          </button>
        </article>
      </div>
    </section>
  );
}
