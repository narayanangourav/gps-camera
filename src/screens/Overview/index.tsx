import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import OverviewMap from "../../components/OverviewMap";
import { useOverviewLogic } from "../../logics/overview.logic";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "./styles";

export default function Overview() {
  const styles = useStyles();
  const {
    location,
    region,
    loading,
    locationPermissionDenied,
    locationError,
    addressText,
    isRecentering,
    markerCoordinate,
    setRegion,
    zoomIn,
    zoomOut,
    recenterToLocation,
    handleUserGesture,
    navigateToCamera,
    navigateToVideo,
    navigateToSettings,
    TARGET_ACCURACY_METERS,
  } = useOverviewLogic();

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("overview-screen", "overview-screen")}
    >
      <LinearGradient
        colors={appTheme.gradients.screen}
        style={StyleSheet.absoluteFill}
        {...webDomProps("overview-background", "overview-background")}
      />

      <View
        style={styles.content}
        {...webDomProps("overview-content", "overview-content")}
      >
        <View style={styles.header} {...webDomProps("overview-header", "overview-header")}>
          <View {...webDomProps("overview-header-text", "overview-header-text")}>
            <Text style={styles.greeting} {...webDomProps("overview-greeting", "overview-greeting")}>
              Welcome Back
            </Text>
            <Text style={styles.appName} {...webDomProps("overview-app-name", "overview-app-name")}>
              GPS Camera
            </Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={navigateToSettings}
            {...webDomProps("overview-settings-button", "overview-settings-button")}
          >
            <Ionicons
              name="settings-sharp"
              size={24}
              color={appTheme.colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle} {...webDomProps("overview-capture-title", "overview-section-title")}>
          Capture Mode
        </Text>
        <View
          style={styles.modesContainer}
          {...webDomProps("overview-mode-cards", "overview-mode-cards")}
        >
          <TouchableOpacity
            style={styles.modeCard}
            onPress={navigateToCamera}
            activeOpacity={0.8}
            {...webDomProps("overview-mode-camera", "overview-mode-card overview-mode-camera")}
          >
            <LinearGradient colors={appTheme.gradients.secondary} style={styles.modeGradient}>
              <View style={styles.modeContent}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="camera"
                    size={32}
                    color={appTheme.colors.iconPrimary}
                  />
                </View>
                <View style={styles.modeTextGroup}>
                  <Text style={styles.modeTitle}>Camera</Text>
                  <Text style={styles.modeSubtitle}>Capture with GPS Tag</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeCard}
            onPress={navigateToVideo}
            activeOpacity={0.8}
            {...webDomProps("overview-mode-video", "overview-mode-card overview-mode-video")}
          >
            <LinearGradient colors={appTheme.gradients.primary} style={styles.modeGradient}>
              <View style={styles.modeContent}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="videocam"
                    size={32}
                    color={appTheme.colors.textPrimary}
                  />
                </View>
                <View style={styles.modeTextGroup}>
                  <Text style={styles.modeTitle}>Video</Text>
                  <Text style={styles.modeSubtitle}>Capture with GPS Tag</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle} {...webDomProps("overview-location-title", "overview-section-title")}>
          Current Location
        </Text>
        <View
          style={styles.locationContainer}
          {...webDomProps("overview-location-container", "overview-location-container")}
        >
          <BlurView
            intensity={20}
            tint="light"
            style={styles.locationCard}
            {...webDomProps("overview-location-card", "overview-location-card")}
          >
            {region ? (
              <OverviewMap
                region={region}
                markerCoordinate={markerCoordinate}
                onRegionChangeComplete={setRegion}
                onUserGesture={handleUserGesture}
              />
            ) : loading ? (
              <View
                style={styles.mapStatus}
                {...webDomProps("overview-map-loading", "overview-map-loading")}
              >
                <ActivityIndicator color={appTheme.colors.textPrimary} />
              </View>
            ) : (
              <View
                style={styles.mapStatus}
                {...webDomProps("overview-map-error", "overview-map-error")}
              >
                <Ionicons
                  name="map-outline"
                  size={32}
                  color={appTheme.colors.textMuted}
                />
                <Text
                  style={styles.mapStatusText}
                  {...webDomProps("overview-map-status-text", "overview-map-status-text")}
                >
                  {locationPermissionDenied
                    ? "Location permission is required to show the map."
                    : locationError ?? "Unable to load the map."}
                </Text>
              </View>
            )}

            <View
              style={styles.mapIconHeader}
              {...webDomProps("overview-map-live-badge", "overview-map-live-badge")}
            >
              <View style={styles.pulsingDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>

            {region && (
              <View
                style={styles.mapControls}
                {...webDomProps("overview-map-controls", "overview-map-controls")}
              >
                <TouchableOpacity
                  style={[
                    styles.mapControlButton,
                    isRecentering && styles.mapControlButtonDisabled,
                  ]}
                  onPress={recenterToLocation}
                  activeOpacity={0.8}
                  disabled={isRecentering}
                  accessibilityLabel="Center on current location"
                  {...webDomProps(
                    "overview-map-control-recenter",
                    "overview-map-control overview-map-control-recenter",
                  )}
                >
                  {isRecentering ? (
                    <ActivityIndicator
                      size="small"
                      color={appTheme.colors.textPrimary}
                    />
                  ) : (
                    <Ionicons
                      name="locate"
                      size={18}
                      color={appTheme.colors.textPrimary}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mapControlButton}
                  onPress={zoomIn}
                  activeOpacity={0.8}
                  accessibilityLabel="Zoom in"
                  {...webDomProps(
                    "overview-map-control-zoom-in",
                    "overview-map-control overview-map-control-zoom-in",
                  )}
                >
                  <Ionicons
                    name="add"
                    size={18}
                    color={appTheme.colors.textPrimary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mapControlButton}
                  onPress={zoomOut}
                  activeOpacity={0.8}
                  accessibilityLabel="Zoom out"
                  {...webDomProps(
                    "overview-map-control-zoom-out",
                    "overview-map-control overview-map-control-zoom-out",
                  )}
                >
                  <Ionicons
                    name="remove"
                    size={18}
                    color={appTheme.colors.textPrimary}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View
              style={styles.locationDetails}
              {...webDomProps("overview-location-details", "overview-location-details")}
            >
              {location ? (
                <>
                  <Text
                    style={styles.locationDetailsText}
                    {...webDomProps("overview-location-lat", "overview-location-lat")}
                  >
                    Lat: {location.coords.latitude.toFixed(6)}
                  </Text>
                  <Text
                    style={styles.locationDetailsText}
                    {...webDomProps("overview-location-lon", "overview-location-lon")}
                  >
                    Lon: {location.coords.longitude.toFixed(6)}
                  </Text>
                  <Text
                    style={styles.locationDetailsMeta}
                    {...webDomProps("overview-location-accuracy", "overview-location-accuracy")}
                  >
                    Accuracy: {Math.round(location.coords.accuracy ?? 0)} m
                  </Text>
                  {addressText && (
                    <Text
                      numberOfLines={2}
                      style={styles.locationDetailsMeta}
                      {...webDomProps("overview-location-address", "overview-location-address")}
                    >
                      {addressText}
                    </Text>
                  )}
                  {(location.coords.accuracy ?? Number.POSITIVE_INFINITY) >
                    TARGET_ACCURACY_METERS && (
                    <Text
                      style={styles.locationWarning}
                      {...webDomProps("overview-location-warning", "overview-location-warning")}
                    >
                      GPS is still calibrating. Move outdoors for better accuracy.
                    </Text>
                  )}
                </>
              ) : (
                <Text
                  style={styles.locationDetailsMeta}
                  {...webDomProps("overview-location-fetching", "overview-location-fetching")}
                >
                  Fetching exact location...
                </Text>
              )}
            </View>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
}
