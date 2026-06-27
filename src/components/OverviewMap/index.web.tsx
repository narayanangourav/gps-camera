import React, { useMemo, useState } from "react";
import { Image, LayoutChangeEvent, View } from "react-native";

import {
  clamp,
  getTileCoordinate,
  getTileUrlFromXYZ,
  isValidTileY,
  MapCoordinate,
  MapRegion,
  wrapTileX,
} from "../../logics/functions.logic";
import { webDomProps } from "../../logics/webDom.logic";
import MapAttribution from "../MapAttribution";
import LocationPointer from "../LocationPointer";
import { styles } from "./styles";

type OverviewMapProps = {
  region: MapRegion;
  markerCoordinate: MapCoordinate | null;
  onRegionChangeComplete?: (region: MapRegion) => void;
  onUserGesture?: () => void;
};

const TILE_SIZE = 256;

export default function OverviewMap({ region }: OverviewMapProps) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const zoom = useMemo(() => {
    const calculated = Math.round(Math.log2(360 / region.longitudeDelta));
    return clamp(calculated, 1, 19);
  }, [region.longitudeDelta]);

  const tiles = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return [];
    }

    const centerTile = getTileCoordinate(region.latitude, region.longitude, zoom);
    const centerPixelX = centerTile.x * TILE_SIZE;
    const centerPixelY = centerTile.y * TILE_SIZE;
    const minPixelX = centerPixelX - viewport.width / 2;
    const maxPixelX = centerPixelX + viewport.width / 2;
    const minPixelY = centerPixelY - viewport.height / 2;
    const maxPixelY = centerPixelY + viewport.height / 2;
    const startTileX = Math.floor(minPixelX / TILE_SIZE);
    const endTileX = Math.floor(maxPixelX / TILE_SIZE);
    const startTileY = Math.floor(minPixelY / TILE_SIZE);
    const endTileY = Math.floor(maxPixelY / TILE_SIZE);
    const nextTiles: Array<{
      key: string;
      left: number;
      top: number;
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
          left: tileX * TILE_SIZE - minPixelX,
          top: tileY * TILE_SIZE - minPixelY,
          uri: getTileUrlFromXYZ(wrappedTileX, tileY, zoom),
        });
      }
    }

    return nextTiles;
  }, [region.latitude, region.longitude, viewport.height, viewport.width, zoom]);

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
    <View
      style={styles.map}
      onLayout={handleLayout}
      {...webDomProps("overview-map-image", "overview-map-image")}
    >
      <View style={styles.tileLayer}>
        {tiles.map((tile) => (
          <Image
            key={tile.key}
            source={{ uri: tile.uri }}
            style={[styles.tileImage, { left: tile.left, top: tile.top }]}
          />
        ))}
      </View>
      <View style={styles.webPin} {...webDomProps("overview-map-pin", "overview-map-pin")}>
        <LocationPointer size={30} />
      </View>
      <MapAttribution />
    </View>
  );
}
