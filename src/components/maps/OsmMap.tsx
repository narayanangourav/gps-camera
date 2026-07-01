import { useEffect, useMemo, useRef, useState } from "react";

import {
  clamp,
  getTileCoordinate,
  getTileUrlFromXYZ,
  isValidTileY,
  wrapTileX,
} from "../../logics/functions.logic";
import MapAttribution from "./MapAttribution";

import styles from "./OsmMap.module.css";

type OsmMapProps = {
  latitude: number;
  longitude: number;
  markerLatitude?: number | null;
  markerLongitude?: number | null;
  zoom: number;
  compactAttribution?: boolean;
};

const TILE_SIZE = 256;

export default function OsmMap({
  latitude,
  longitude,
  markerLatitude,
  markerLongitude,
  zoom,
  compactAttribution = false,
}: OsmMapProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setViewport({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const safeZoom = clamp(Math.round(zoom), 1, 19);

  const tiles = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return [];
    }

    const centerTile = getTileCoordinate(latitude, longitude, safeZoom);
    const centerPixelX = centerTile.x * TILE_SIZE;
    const centerPixelY = centerTile.y * TILE_SIZE;
    const minPixelX = centerPixelX - viewport.width / 2;
    const maxPixelX = centerPixelX + viewport.width / 2;
    const minPixelY = centerPixelY - viewport.height / 2;
    const maxPixelY = centerPixelY + viewport.height / 2;
    const startTileX = Math.floor(minPixelX / TILE_SIZE) - 1;
    const endTileX = Math.floor(maxPixelX / TILE_SIZE) + 1;
    const startTileY = Math.floor(minPixelY / TILE_SIZE) - 1;
    const endTileY = Math.floor(maxPixelY / TILE_SIZE) + 1;
    const nextTiles: Array<{
      key: string;
      left: number;
      top: number;
      size: number;
      src: string;
    }> = [];

    for (let tileX = startTileX; tileX <= endTileX; tileX += 1) {
      for (let tileY = startTileY; tileY <= endTileY; tileY += 1) {
        if (!isValidTileY(tileY, safeZoom)) {
          continue;
        }

        const wrappedTileX = wrapTileX(tileX, safeZoom);
        nextTiles.push({
          key: `${safeZoom}-${wrappedTileX}-${tileY}-${tileX}`,
          left: tileX * TILE_SIZE - minPixelX,
          top: tileY * TILE_SIZE - minPixelY,
          size: TILE_SIZE,
          src: getTileUrlFromXYZ(wrappedTileX, tileY, safeZoom),
        });
      }
    }

    return nextTiles;
  }, [latitude, longitude, safeZoom, viewport.height, viewport.width]);

  const marker = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return null;
    }

    const markerLat = markerLatitude ?? latitude;
    const markerLon = markerLongitude ?? longitude;
    const centerTile = getTileCoordinate(latitude, longitude, safeZoom);
    const markerTile = getTileCoordinate(markerLat, markerLon, safeZoom);
    const centerPixelX = centerTile.x * TILE_SIZE;
    const centerPixelY = centerTile.y * TILE_SIZE;
    const markerPixelX = markerTile.x * TILE_SIZE;
    const markerPixelY = markerTile.y * TILE_SIZE;

    return {
      left: viewport.width / 2 + (markerPixelX - centerPixelX),
      top: viewport.height / 2 + (markerPixelY - centerPixelY),
    };
  }, [latitude, longitude, markerLatitude, markerLongitude, safeZoom, viewport.height, viewport.width]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.tiles}>
        {tiles.map((tile) => (
          <img
            key={tile.key}
            alt=""
            className={styles.tile}
            src={tile.src}
            style={{
              left: `${tile.left}px`,
              top: `${tile.top}px`,
              width: `${tile.size}px`,
              height: `${tile.size}px`,
            }}
          />
        ))}
      </div>
      {marker ? (
        <div
          className={styles.marker}
          style={{
            left: `${marker.left}px`,
            top: `${marker.top}px`,
          }}
        />
      ) : null}
      <MapAttribution compact={compactAttribution} />
    </div>
  );
}
