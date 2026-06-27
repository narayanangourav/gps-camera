import { useEffect, useRef, useState } from "react";

import { AppLocation } from "../../models/location.model";
import { AppPreferences } from "../../models/preferences.model";
import { WeatherSnapshot } from "../../models/weather.model";
import {
  buildDownloadFileName,
  createCapturedMediaItem,
} from "../../services/stamp.service";
import { renderCaptureBlob } from "../services/captureRenderer";

type UseCameraCaptureOptions = {
  addCaptureHistoryItem: (item: ReturnType<typeof createCapturedMediaItem>) => void;
  location: AppLocation | null;
  preferences: AppPreferences;
  weather: WeatherSnapshot;
};

const playShutterFeedback = () => {
  if (typeof window === "undefined") {
    return;
  }

  const AudioContextCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextCtor) {
    return;
  }

  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(880, context.currentTime);
  gainNode.gain.setValueAtTime(0.001, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.12);
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.12);
  oscillator.onended = () => {
    void context.close();
  };
};

export const useCameraCapture = ({
  addCaptureHistoryItem,
  location,
  preferences,
  weather,
}: UseCameraCaptureOptions) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdownRemaining, setCountdownRemaining] = useState<number | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  const startStream = async (requestedFacingMode: "environment" | "user") => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not available in this browser.");
      return;
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setCameraReady(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: requestedFacingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.();
      setTorchSupported(Boolean(capabilities && "torch" in capabilities));
      setTorchEnabled(false);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraError(null);
      setCameraReady(true);
    } catch (_error) {
      setCameraError("Unable to access the camera.");
      setCameraReady(false);
    }
  };

  useEffect(() => {
    void startStream(facingMode);

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [facingMode]);

  const downloadCapture = async () => {
    if (!videoRef.current || isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      const blob = await renderCaptureBlob({
        location,
        projectName: preferences.selectedProjectName,
        stampConfig: preferences.stampConfig,
        weather,
        video: videoRef.current,
      });
      const uri = URL.createObjectURL(blob);
      const createdAt = Date.now();
      const link = document.createElement("a");
      const fileName = buildDownloadFileName(
        preferences.selectedProjectName,
        "picture",
        createdAt,
      );

      link.href = uri;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addCaptureHistoryItem(
        createCapturedMediaItem(
          uri,
          "picture",
          preferences.selectedProjectName,
          location?.address?.displayLabel ?? null,
          createdAt,
        ),
      );

      if (preferences.cameraSoundEnabled) {
        playShutterFeedback();
      }
    } finally {
      setIsCapturing(false);
    }
  };

  const triggerCapture = () => {
    if (preferences.timerSeconds === 0) {
      void downloadCapture();
      return;
    }

    setCountdownRemaining(preferences.timerSeconds);
    timerRef.current = window.setInterval(() => {
      setCountdownRemaining((current) => {
        if (current === null || current <= 1) {
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          void downloadCapture();
          return null;
        }

        return current - 1;
      });
    }, 1000);
  };

  const toggleFacingMode = () => {
    setFacingMode((current) => (current === "environment" ? "user" : "environment"));
  };

  const toggleTorch = async () => {
    if (!torchSupported || !streamRef.current) {
      return;
    }

    const track = streamRef.current.getVideoTracks()[0];
    try {
      const nextValue = !torchEnabled;
      await track.applyConstraints({
        advanced: [{ torch: nextValue } as MediaTrackConstraintSet],
      });
      setTorchEnabled(nextValue);
    } catch (_error) {
      setTorchEnabled(false);
    }
  };

  return {
    videoRef,
    cameraError,
    cameraReady,
    isCapturing,
    countdownRemaining,
    facingMode,
    torchEnabled,
    torchSupported,
    triggerCapture,
    toggleFacingMode,
    toggleTorch,
  };
};
