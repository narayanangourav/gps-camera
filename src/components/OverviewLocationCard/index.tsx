import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import OverviewMap from "../OverviewMap";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "../../screens/Overview/styles";

type OverviewLocationCardProps = {
  styles: ReturnType<typeof useStyles>;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
  } | null;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null;
  loading: boolean;
  locationPermissionDenied: boolean;
  locationError: string | null;
  addressText: string | null;
  isRecentering: boolean;
  markerCoordinate: { latitude: number; longitude: number } | null;
  setRegion: (region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => void;
  handleUserGesture: () => void;
  recenterToLocation: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  targetAccuracyMeters: number;
};

export default function OverviewLocationCard(props: OverviewLocationCardProps) {
  return (
    <View
      style={props.styles.locationContainer}
      {...webDomProps("overview-location-container", "overview-location-container")}
    >
      <BlurView
        intensity={20}
        tint="light"
        style={props.styles.locationCard}
        {...webDomProps("overview-location-card", "overview-location-card")}
      >
        {props.region ? (
          <OverviewMap
            region={props.region}
            markerCoordinate={props.markerCoordinate}
            onRegionChangeComplete={props.setRegion}
            onUserGesture={props.handleUserGesture}
          />
        ) : props.loading ? (
          <View style={props.styles.mapStatus}>
            <ActivityIndicator color={appTheme.colors.textPrimary} />
          </View>
        ) : (
          <View style={props.styles.mapStatus}>
            <Ionicons name="map-outline" size={32} color={appTheme.colors.textMuted} />
            <Text style={props.styles.mapStatusText}>
              {props.locationPermissionDenied
                ? "Location permission is required to show the map."
                : props.locationError ?? "Unable to load the map."}
            </Text>
          </View>
        )}
        <View style={props.styles.mapIconHeader}>
          <View style={props.styles.pulsingDot} />
          <Text style={props.styles.liveText}>LIVE</Text>
        </View>
        {props.region ? (
          <View style={props.styles.mapControls}>
            <TouchableOpacity
              style={[
                props.styles.mapControlButton,
                props.isRecentering && props.styles.mapControlButtonDisabled,
              ]}
              onPress={props.recenterToLocation}
              activeOpacity={0.8}
              disabled={props.isRecentering}
            >
              {props.isRecentering ? (
                <ActivityIndicator size="small" color={appTheme.colors.textPrimary} />
              ) : (
                <Ionicons name="locate" size={18} color={appTheme.colors.textPrimary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={props.styles.mapControlButton} onPress={props.zoomIn}>
              <Ionicons name="add" size={18} color={appTheme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={props.styles.mapControlButton} onPress={props.zoomOut}>
              <Ionicons name="remove" size={18} color={appTheme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={props.styles.locationDetails}>
          {props.location ? (
            <>
              <Text style={props.styles.locationDetailsText}>
                Lat: {props.location.latitude.toFixed(6)}
              </Text>
              <Text style={props.styles.locationDetailsText}>
                Lon: {props.location.longitude.toFixed(6)}
              </Text>
              <Text style={props.styles.locationDetailsMeta}>
                Accuracy: {Math.round(props.location.accuracy ?? 0)} m
              </Text>
              {props.addressText ? (
                <Text numberOfLines={2} style={props.styles.locationDetailsMeta}>
                  {props.addressText}
                </Text>
              ) : null}
              {(props.location.accuracy ?? Number.POSITIVE_INFINITY) >
              props.targetAccuracyMeters ? (
                <Text style={props.styles.locationWarning}>
                  GPS is still calibrating. Move outdoors for better accuracy.
                </Text>
              ) : null}
            </>
          ) : (
            <Text style={props.styles.locationDetailsMeta}>Fetching exact location...</Text>
          )}
        </View>
      </BlurView>
    </View>
  );
}
