import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AppLocation } from "../../models/location.model";
import { AppPreferences } from "../../models/preferences.model";
import { WeatherSnapshot } from "../../models/weather.model";
import { createCapturedMediaItem } from "../../services/stamp.service";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import IconButton from "../../components/ui/IconButton";
import PageShell from "../../components/ui/PageShell";
import Pill from "../../components/ui/Pill";
import SectionHeader from "../../components/ui/SectionHeader";
import { useCameraCapture } from "../../hooks/useCameraCapture";

import styles from "./CameraScreen.module.css";

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
    <PageShell className="mx-auto max-w-7xl" inset="regular">
      <input
        ref={logic.fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        id="device-camera-input"
        onChange={logic.handleDeviceImageSelection}
        type="file"
      />

      <SectionHeader
        actions={
          <IconButton
            className="text-app-primary"
            id="camera-refresh-button"
            label="Refresh GPS"
            onClick={onRefreshLocation}
          >
            <RefreshIcon className="h-6 w-6" fontSize="inherit" />
          </IconButton>
        }
        eyebrow="Camera"
      >
        <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-2.5">
          <IconButton
            className="mt-0.5 text-slate-700"
            id="camera-back-button"
            label="Back"
            onClick={onBack}
          >
            <ArrowBackIcon className="h-5 w-5 sm:h-6 sm:w-6" fontSize="inherit" />
          </IconButton>
          <h1 className="m-0 min-w-0 text-[clamp(1.65rem,7vw,3.25rem)] font-bold leading-[1] text-slate-950">
            Browser Capture
          </h1>
        </div>
      </SectionHeader>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.8fr)]">
        <article
          className={`${styles.previewCard} relative min-h-[22rem] rounded-[1.5rem] border border-slate-200/80 bg-white/95 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:min-h-[32rem]`}
        >
          {logic.captureMode === "device" && logic.selectedImagePreviewUrl ? (
            <img
              alt="Captured device preview"
              className={`${styles.video} h-full min-h-[22rem] w-full sm:min-h-[32rem]`}
              src={logic.selectedImagePreviewUrl}
            />
          ) : (
            <video
              ref={logic.videoRef}
              autoPlay
              className={`${styles.video} h-full min-h-[22rem] w-full sm:min-h-[32rem]`}
              muted
              playsInline
            />
          )}
          {logic.countdownRemaining !== null ? (
            <div
              className={`${styles.countdown} absolute inset-0 grid place-items-center bg-slate-950/40 text-[5rem] font-extrabold text-white`}
            >
              {logic.countdownRemaining}
            </div>
          ) : null}
        </article>

        <aside className="grid gap-4">
          <Card className="flex flex-col gap-4">
            <h2 className="m-0 text-lg font-semibold text-slate-950">Capture</h2>
            <p className="text-base leading-7 text-app-muted">
              {logic.captureMode === "device"
                ? logic.selectedImageName
                  ? `Ready to stamp ${logic.selectedImageName}.`
                  : "Use the device camera first, or switch to the browser camera fallback."
                : logic.cameraReady
                  ? "Browser camera stream ready."
                  : "Waiting for camera permission or browser support."}
            </p>
            {logic.cameraError ? (
              <p className="text-base leading-7 text-amber-700">{logic.cameraError}</p>
            ) : null}
            <div className="grid gap-3">
              <Button block onClick={logic.openDeviceCamera} variant="primary">
                Use Device Camera
              </Button>
              <Button block onClick={logic.useBrowserCamera}>
                Use Browser Camera
              </Button>
              <Button
                block
                disabled={
                  logic.captureMode === "device"
                    ? !logic.selectedImagePreviewUrl || logic.isCapturing
                    : !logic.cameraReady || logic.isCapturing
                }
                onClick={logic.triggerCapture}
                variant="secondary"
              >
                {logic.isCapturing ? "Capturing..." : "Save Stamped Photo"}
              </Button>
              <Button
                block
                disabled={logic.captureMode !== "browser"}
                onClick={logic.toggleFacingMode}
              >
                Switch Camera
              </Button>
              <Button
                block
                disabled={logic.captureMode !== "browser" || !logic.torchSupported}
                onClick={() => void logic.toggleTorch()}
              >
                {logic.torchSupported
                  ? logic.torchEnabled
                    ? "Disable Torch"
                    : "Enable Torch"
                  : "Torch Unsupported"}
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="m-0 text-lg font-semibold text-slate-950">Stamp preview</h2>
            <div className="grid gap-3">
              <Pill>{preferences.selectedProjectName}</Pill>
              <Pill>
                {preferences.timerSeconds === 0
                  ? "Timer Off"
                  : `${preferences.timerSeconds}s timer`}
              </Pill>
              <Pill>
                {logic.captureMode === "device"
                  ? "Device camera first"
                  : "Browser camera fallback"}
              </Pill>
              <Pill>{preferences.locationMode}</Pill>
              {location ? (
                <>
                  <p className="m-0 text-lg font-semibold text-slate-950 sm:text-xl">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </p>
                  {location.address?.displayLabel ? (
                    <p className="text-base leading-7 text-app-muted">
                      {location.address.displayLabel}
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="text-base leading-7 text-app-muted">Location not available yet.</p>
              )}
              {preferences.stampConfig.showWeather &&
              weather.temperatureCelsius !== null ? (
                <p className="text-base leading-7 text-app-muted">
                  {weather.temperatureCelsius.toFixed(1)}°C
                  {weather.windSpeedKph !== null
                    ? `, ${Math.round(weather.windSpeedKph)} km/h wind`
                    : ""}
                </p>
              ) : null}
            </div>
          </Card>
        </aside>
      </div>
    </PageShell>
  );
}
