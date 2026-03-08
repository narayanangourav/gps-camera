import React, { useRef } from "react";
import { Platform } from "react-native";
import MapView, { Marker, Region, UrlTile } from "react-native-maps";

import { MAP_TILE_URL_TEMPLATE, MapCoordinate } from "../../logics/functions.logic";
import LocationPointer from "../LocationPointer";
import { styles } from "./styles";

type OverviewMapProps = {
  region: Region;
  markerCoordinate: MapCoordinate | null;
  onRegionChangeComplete: (region: Region) => void;
  onUserGesture?: () => void;
};

export default function OverviewMap({
  region,
  markerCoordinate,
  onRegionChangeComplete,
  onUserGesture,
}: OverviewMapProps) {
  const mapRef = useRef<MapView | null>(null);

  const handleMarkerPress = () => {
    if (!markerCoordinate) return;
    const targetRegion: Region = {
      latitude: markerCoordinate.latitude,
      longitude: markerCoordinate.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
    mapRef.current?.animateToRegion(targetRegion, 250);
    onRegionChangeComplete(targetRegion);
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={region}
      onRegionChange={onRegionChangeComplete}
      onRegionChangeComplete={(nextRegion, details) => {
        onRegionChangeComplete(nextRegion);
        if (details?.isGesture) onUserGesture?.();
      }}
      onPanDrag={onUserGesture}
      mapType={Platform.OS === "android" ? "none" : "standard"}
      scrollEnabled
      zoomEnabled
      pitchEnabled={false}
      rotateEnabled={false}
      toolbarEnabled={false}
    >
      {Platform.OS === "android" && (
        <UrlTile urlTemplate={MAP_TILE_URL_TEMPLATE} maximumZ={19} flipY={false} />
      )}
      {markerCoordinate && (
        <Marker
          coordinate={markerCoordinate}
          anchor={{ x: 0.5, y: 1 }}
          tracksViewChanges={false}
          onPress={handleMarkerPress}
        >
          <LocationPointer size={30} />
        </Marker>
      )}
    </MapView>
  );
}
