import { AppLocation } from "../../models/location.model";
import { AppPreferences } from "../../models/preferences.model";
import { WeatherSnapshot } from "../../models/weather.model";
import { createCapturedMediaItem } from "../../services/stamp.service";
import { useCameraCapture } from "../hooks/useCameraCapture";

type CameraScreenProps = {
  addCaptureHistoryItem: (item: ReturnType<typeof createCapturedMediaItem>) => void;
  location: AppLocation | null;
  onBack: () => void;
  onRefreshLocation: () => void;
  preferences: AppPreferences;
  weather: WeatherSnapshot;
};

export default function CameraScreen({
  addCaptureHistoryItem,
  location,
  onBack,
  onRefreshLocation,
  preferences,
  weather,
}: CameraScreenProps) {
  const logic = useCameraCapture({
    addCaptureHistoryItem,
    location,
    preferences,
    weather,
  });

  return (
    <section className="camera-screen">
      <header className="screen-header camera-screen-header">
        <div>
          <p className="screen-eyebrow">Camera</p>
          <h1 className="screen-title">Browser Capture</h1>
        </div>
        <div className="app-action-row">
          <button className="app-secondary-button" onClick={onRefreshLocation} type="button">
            Refresh GPS
          </button>
          <button className="app-secondary-button" onClick={onBack} type="button">
            Back
          </button>
        </div>
      </header>

      <div className="camera-layout">
        <article className="camera-preview-card">
          <video
            ref={logic.videoRef}
            autoPlay
            className="camera-video"
            muted
            playsInline
          />
          {logic.countdownRemaining !== null ? (
            <div className="camera-countdown">{logic.countdownRemaining}</div>
          ) : null}
        </article>

        <aside className="camera-sidebar">
          <article className="app-card">
            <h2 className="app-card-title">Capture</h2>
            <p className="app-muted-text">
              {logic.cameraReady
                ? "Camera stream ready."
                : "Waiting for camera permission or browser support."}
            </p>
            {logic.cameraError ? (
              <p className="app-warning-text">{logic.cameraError}</p>
            ) : null}
            <div className="app-action-column">
              <button
                className="app-primary-button"
                disabled={!logic.cameraReady || logic.isCapturing}
                onClick={logic.triggerCapture}
                type="button"
              >
                {logic.isCapturing ? "Capturing..." : "Capture Photo"}
              </button>
              <button
                className="app-secondary-button"
                onClick={logic.toggleFacingMode}
                type="button"
              >
                Switch Camera
              </button>
              <button
                className="app-secondary-button"
                disabled={!logic.torchSupported}
                onClick={() => void logic.toggleTorch()}
                type="button"
              >
                {logic.torchSupported
                  ? logic.torchEnabled
                    ? "Disable Torch"
                    : "Enable Torch"
                  : "Torch Unsupported"}
              </button>
            </div>
          </article>

          <article className="app-card">
            <h2 className="app-card-title">Stamp preview</h2>
            <div className="camera-meta-stack">
              <span className="app-pill">{preferences.selectedProjectName}</span>
              <span className="app-pill">
                {preferences.timerSeconds === 0
                  ? "Timer Off"
                  : `${preferences.timerSeconds}s timer`}
              </span>
              <span className="app-pill">{preferences.locationMode}</span>
              {location ? (
                <>
                  <p className="camera-coordinate-text">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </p>
                  {location.address?.displayLabel ? (
                    <p className="app-muted-text">{location.address.displayLabel}</p>
                  ) : null}
                </>
              ) : (
                <p className="app-muted-text">Location not available yet.</p>
              )}
              {preferences.stampConfig.showWeather &&
              weather.temperatureCelsius !== null ? (
                <p className="app-muted-text">
                  {weather.temperatureCelsius.toFixed(1)}°C
                  {weather.windSpeedKph !== null
                    ? `, ${Math.round(weather.windSpeedKph)} km/h wind`
                    : ""}
                </p>
              ) : null}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
