import { AppLocation } from "../models/location.model";
import { StampConfig } from "../models/preferences.model";
import { WeatherSnapshot } from "../models/weather.model";
import {
  getTileCoordinate,
  getTileUrlFromXYZ,
  isValidTileY,
  wrapTileX,
} from "../logics/functions.logic";

type CaptureRenderInput = {
  location: AppLocation | null;
  projectName: string;
  stampConfig: StampConfig;
  weather: WeatherSnapshot;
  source: HTMLVideoElement | HTMLImageElement;
};

const TILE_SIZE = 256;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

const drawMapStamp = async (
  ctx: CanvasRenderingContext2D,
  location: AppLocation,
  stampConfig: StampConfig,
  x: number,
  y: number,
  size: number,
) => {
  const zoom = Math.max(1, Math.min(19, Math.round(stampConfig.mapZoom)));
  const centerTile = getTileCoordinate(location.latitude, location.longitude, zoom);
  const centerPixelX = centerTile.x * TILE_SIZE;
  const centerPixelY = centerTile.y * TILE_SIZE;
  const minPixelX = centerPixelX - size / 2;
  const minPixelY = centerPixelY - size / 2;
  const startTileX = Math.floor(minPixelX / TILE_SIZE);
  const startTileY = Math.floor(minPixelY / TILE_SIZE);
  const endTileX = Math.floor((minPixelX + size) / TILE_SIZE);
  const endTileY = Math.floor((minPixelY + size) / TILE_SIZE);

  ctx.save();
  drawRoundedRect(ctx, x, y, size, size, 14);
  ctx.clip();
  ctx.fillStyle = "#E2E8F0";
  ctx.fillRect(x, y, size, size);

  const tilePromises: Array<Promise<void>> = [];

  for (let tileX = startTileX; tileX <= endTileX; tileX += 1) {
    for (let tileY = startTileY; tileY <= endTileY; tileY += 1) {
      if (!isValidTileY(tileY, zoom)) {
        continue;
      }

      const wrappedTileX = wrapTileX(tileX, zoom);
      const tileUrl = getTileUrlFromXYZ(wrappedTileX, tileY, zoom);
      const drawX = x + tileX * TILE_SIZE - minPixelX;
      const drawY = y + tileY * TILE_SIZE - minPixelY;

      tilePromises.push(
        loadImage(tileUrl).then((image) => {
          ctx.drawImage(image, drawX, drawY, TILE_SIZE, TILE_SIZE);
        }),
      );
    }
  }

  try {
    await Promise.all(tilePromises);
  } catch (_error) {
    // Keep the stamp background if tile loading fails.
  }

  const markerX = x + size / 2;
  const markerY = y + size / 2;

  ctx.fillStyle = "#DC2626";
  ctx.beginPath();
  ctx.arc(markerX, markerY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.fillRect(x + 8, y + size - 22, size - 16, 14);
  ctx.fillStyle = "#334155";
  ctx.font = "600 10px system-ui";
  ctx.fillText("© OpenStreetMap contributors", x + 12, y + size - 12);
  ctx.restore();
};

const buildMetaLines = (
  location: AppLocation | null,
  stampConfig: StampConfig,
  weather: WeatherSnapshot,
  timestamp: Date,
) => {
  const lines: string[] = [];

  if (stampConfig.showDateTime) {
    lines.push(
      `${timestamp.toLocaleDateString("en-GB")} ${timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    );
  }

  if (stampConfig.showAddress && location?.address?.displayLabel) {
    lines.push(location.address.displayLabel);
  }

  if (stampConfig.showCoordinates && location) {
    lines.push(
      `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`,
    );
  }

  if (stampConfig.showAccuracy && location && location.accuracy !== null) {
    lines.push(`Accuracy ${Math.round(location.accuracy)} m`);
  }

  if (stampConfig.showAltitude && location && location.altitude !== null) {
    lines.push(`Altitude ${Math.round(location.altitude)} m`);
  }

  if (stampConfig.showTimezone) {
    lines.push(
      `Timezone ${Intl.DateTimeFormat().resolvedOptions().timeZone || "Local"}`,
    );
  }

  if (stampConfig.showWeather && weather.temperatureCelsius !== null) {
    lines.push(`Temp ${weather.temperatureCelsius.toFixed(1)}\u00B0C`);
  }

  if (stampConfig.showWind && weather.windSpeedKph !== null) {
    lines.push(`Wind ${Math.round(weather.windSpeedKph)} km/h`);
  }

  if (stampConfig.showHumidity && weather.humidityPercent !== null) {
    lines.push(`Humidity ${Math.round(weather.humidityPercent)}%`);
  }

  if (stampConfig.showPressure && weather.pressureHpa !== null) {
    lines.push(`Pressure ${Math.round(weather.pressureHpa)} hPa`);
  }

  return lines;
};

export const renderCaptureBlob = async ({
  location,
  projectName,
  stampConfig,
  source,
  weather,
}: CaptureRenderInput) => {
  const width =
    source instanceof HTMLVideoElement
      ? Math.max(source.videoWidth || 1280, 640)
      : Math.max(source.naturalWidth || source.width || 1280, 640);
  const height =
    source instanceof HTMLVideoElement
      ? Math.max(source.videoHeight || 720, 480)
      : Math.max(source.naturalHeight || source.height || 720, 480);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas rendering is not available.");
  }

  ctx.drawImage(source, 0, 0, width, height);

  const timestamp = new Date();
  const lines = buildMetaLines(location, stampConfig, weather, timestamp);
  const panelHeight = Math.min(210, Math.max(140, lines.length * 22 + 56));

  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
  ctx.fillRect(0, height - panelHeight, width, panelHeight);
  ctx.restore();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 28px system-ui";
  ctx.fillText(projectName, 28, height - panelHeight + 40);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "500 16px system-ui";
  ctx.fillText("GPS Camera", 30, height - panelHeight + 66);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "500 17px system-ui";
  lines.forEach((line, index) => {
    ctx.fillText(line, 30, height - panelHeight + 102 + index * 22);
  });

  if (stampConfig.showMap && location) {
    const mapSize = Math.min(160, Math.max(96, stampConfig.mapSize * 1.6));
    await drawMapStamp(
      ctx,
      location,
      stampConfig,
      width - mapSize - 28,
      height - panelHeight + 24,
      mapSize,
    );
  }

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Capture export failed."));
        return;
      }

      resolve(blob);
    }, "image/jpeg", 0.94);
  });
};
