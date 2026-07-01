import { ChangeEvent, useEffect, useRef, useState } from "react";

import { AppLocation } from "../models/location.model";
import { AppPreferences } from "../models/preferences.model";
import { WeatherSnapshot } from "../models/weather.model";
import {
  buildDownloadFileName,
  createCapturedMediaItem,
} from "../services/stamp.service";
import { renderCaptureBlob } from "../lib/captureRenderer";

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const imagePreviewUrlRef = useRef<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdownRemaining, setCountdownRemaining] = useState<number | null>(null);
  const [captureMode, setCaptureMode] = useState<"device" | "browser">("device");
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [selectedImagePreviewUrl, setSelectedImagePreviewUrl] = useState<string | null>(
    null,
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

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraReady(false);
    setTorchSupported(false);
    setTorchEnabled(false);
  };

  useEffect(() => {
    if (captureMode === "browser") {
      void startStream(facingMode);
    } else {
      stopStream();
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
      stopStream();
    };
  }, [captureMode, facingMode]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  const downloadCapture = async (source: HTMLVideoElement | HTMLImageElement) => {
    if (isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      const blob = await renderCaptureBlob({
        location,
        projectName: preferences.selectedProjectName,
        source,
        stampConfig: preferences.stampConfig,
        weather,
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
    const source =
      captureMode === "device" ? selectedImage : videoRef.current;

    if (!source) {
      setCameraError(
        captureMode === "device"
          ? "Capture or select an image from the device camera first."
          : "Camera preview is not ready yet.",
      );
      return;
    }

    if (preferences.timerSeconds === 0) {
      void downloadCapture(source);
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
          void downloadCapture(source);
          return null;
        }

        return current - 1;
      });
    }, 1000);
  };

  const toggleFacingMode = () => {
    setCaptureMode("browser");
    setFacingMode((current) => (current === "environment" ? "user" : "environment"));
  };

  const openDeviceCamera = () => {
    setCaptureMode("device");
    setCameraError(null);
    fileInputRef.current?.click();
  };

  const useBrowserCamera = () => {
    setCaptureMode("browser");
    setCameraError(null);
  };

  const handleDeviceImageSelection = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      const previewUrl = URL.createObjectURL(selectedFile);
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const nextImage = new Image();
        nextImage.onload = () => resolve(nextImage);
        nextImage.onerror = () => reject(new Error("Image loading failed."));
        nextImage.src = previewUrl;
      });

      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }

      imagePreviewUrlRef.current = previewUrl;
      setSelectedImage(image);
      setSelectedImageName(selectedFile.name);
      setSelectedImagePreviewUrl(previewUrl);
      setCaptureMode("device");
      setCameraError(null);
    } catch (_error) {
      setCameraError("Unable to open the captured image.");
      setSelectedImage(null);
      setSelectedImageName(null);
      setSelectedImagePreviewUrl(null);
    } finally {
      event.target.value = "";
    }
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
    fileInputRef,
    videoRef,
    cameraError,
    cameraReady,
    captureMode,
    isCapturing,
    countdownRemaining,
    facingMode,
    selectedImageName,
    selectedImagePreviewUrl,
    torchEnabled,
    torchSupported,
    handleDeviceImageSelection,
    openDeviceCamera,
    triggerCapture,
    toggleFacingMode,
    toggleTorch,
    useBrowserCamera,
  };
};
