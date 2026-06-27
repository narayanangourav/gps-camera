import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import OverviewCaptureModes from "../../components/OverviewCaptureModes";
import OverviewLocationCard from "../../components/OverviewLocationCard";
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
        style={styles.absoluteFill}
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
        <OverviewCaptureModes
          styles={styles}
          navigateToCamera={navigateToCamera}
          navigateToVideo={navigateToVideo}
        />

        <Text style={styles.sectionTitle} {...webDomProps("overview-location-title", "overview-section-title")}>
          Current Location
        </Text>
        <OverviewLocationCard
          styles={styles}
          location={location}
          region={region}
          loading={loading}
          locationPermissionDenied={locationPermissionDenied}
          locationError={locationError}
          addressText={addressText}
          isRecentering={isRecentering}
          markerCoordinate={markerCoordinate}
          setRegion={setRegion}
          handleUserGesture={handleUserGesture}
          recenterToLocation={recenterToLocation}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          targetAccuracyMeters={TARGET_ACCURACY_METERS}
        />
      </View>
    </SafeAreaView>
  );
}
