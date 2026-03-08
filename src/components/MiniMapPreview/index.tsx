import React, { useMemo, useState } from "react";
import { Image, LayoutChangeEvent, View } from "react-native";

import {
  clamp,
  getTileCoordinate,
  getTileUrlFromXYZ,
  isValidTileY,
  wrapTileX,
} from "../../logics/functions.logic";
import LocationPointer from "../LocationPointer";
import { styles } from "./styles";

type MiniMapPreviewProps = {
  latitude: number;
  longitude: number;
  pinSize?: number;
  scale?: number;
  zoom?: number;
};

const TILE_SIZE = 256;

export default function MiniMapPreview({
  latitude,
  longitude,
  pinSize = 24,
  scale = 0.95,
  zoom = 15,
}: MiniMapPreviewProps) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const clampedScale = clamp(scale, 0.75, 1);

  const tiles = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return [];
    }

    const centerTile = getTileCoordinate(latitude, longitude, zoom);
    const centerPixelX = centerTile.x * TILE_SIZE;
    const centerPixelY = centerTile.y * TILE_SIZE;
    const virtualWidth = viewport.width / clampedScale;
    const virtualHeight = viewport.height / clampedScale;
    const minPixelX = centerPixelX - virtualWidth / 2;
    const maxPixelX = centerPixelX + virtualWidth / 2;
    const minPixelY = centerPixelY - virtualHeight / 2;
    const maxPixelY = centerPixelY + virtualHeight / 2;
    const startTileX = Math.floor(minPixelX / TILE_SIZE) - 1;
    const endTileX = Math.floor(maxPixelX / TILE_SIZE) + 1;
    const startTileY = Math.floor(minPixelY / TILE_SIZE) - 1;
    const endTileY = Math.floor(maxPixelY / TILE_SIZE) + 1;
    const nextTiles: Array<{
      key: string;
      left: number;
      top: number;
      size: number;
      uri: string;
    }> = [];

    for (let tileX = startTileX; tileX <= endTileX; tileX += 1) {
      for (let tileY = startTileY; tileY <= endTileY; tileY += 1) {
        if (!isValidTileY(tileY, zoom)) {
          continue;
        }

        const wrappedTileX = wrapTileX(tileX, zoom);
        nextTiles.push({
          key: `${zoom}-${wrappedTileX}-${tileY}-${tileX}`,
          left: (tileX * TILE_SIZE - minPixelX) * clampedScale,
          top: (tileY * TILE_SIZE - minPixelY) * clampedScale,
          size: TILE_SIZE * clampedScale,
          uri: getTileUrlFromXYZ(wrappedTileX, tileY, zoom),
        });
      }
    }

    return nextTiles;
  }, [clampedScale, latitude, longitude, viewport.height, viewport.width, zoom]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setViewport((current) => {
      if (current.width === width && current.height === height) {
        return current;
      }

      return { width, height };
    });
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.tileLayer}>
        {tiles.map((tile) => (
          <Image
            key={tile.key}
            source={{ uri: tile.uri }}
            style={[
              styles.tileImage,
              {
                left: tile.left,
                top: tile.top,
                width: tile.size,
                height: tile.size,
              },
            ]}
          />
        ))}
      </View>
      <View
        style={[
          styles.pin,
          {
            marginLeft: -pinSize / 2,
            marginTop: -(pinSize + Math.round(pinSize * 0.35)),
          },
        ]}
      >
        <LocationPointer size={pinSize} />
      </View>
    </View>
  );
}
