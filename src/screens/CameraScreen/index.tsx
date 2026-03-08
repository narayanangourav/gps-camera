import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { CameraView } from "expo-camera";
import ViewShot from "react-native-view-shot";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../App";
import AutoScrollText from "../../components/AutoScrollText";
import LocationPointer from "../../components/LocationPointer";
import { MAP_TILE_ATTRIBUTION } from "../../logics/functions.logic";
import { useCameraLogic } from "../../logics/camera.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Camera">;

export default function CameraScreen({ route }: Props) {
  const mode = route.params?.mode || "picture";
  const {
    cameraPermission,
    locationPermission,
    location,
    addressLines,
    weather,
    locationError,
    isRefreshingLocation,
    facing,
    flash,
    isDualMode,
    isCapturing,
    isRecording,
    recordingDuration,
    viewShotRef,
    cameraRef,
    dateStr,
    timeStr,
    mapTileUrl,
    refreshLocation,
    handleAction,
    toggleCameraFacing,
    toggleFlash,
    toggleDualMode,
    formatDuration,
  } = useCameraLogic(mode);

  const addressLine1 = addressLines
    ? addressLines.line1
    : location
      ? "Resolving full address from GPS..."
      : "Fetching location...";
  const addressLine2 = addressLines
    ? addressLines.line2
    : location
      ? "Please wait..."
      : "";
  const latitudeText = location
    ? `Lat ${location.coords.latitude.toFixed(6)}`
    : "Lat --";
  const longitudeText = location
    ? `Lon ${location.coords.longitude.toFixed(6)}`
    : "Lon --";

  if (!cameraPermission || !locationPermission) {
    return <View style={styles.container} />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access needed</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("camera-screen", "camera-screen")}
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View
        style={styles.captureContainer}
        {...webDomProps("camera-capture-container", "camera-capture-container")}
      >
        <ViewShot
          ref={viewShotRef}
          style={{ flex: 1 }}
          options={{ format: "jpg", quality: 1.0 }}
        >
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            flash={flash}
            mode={mode}
          >
            {isDualMode && (
              <View style={styles.pipCameraContainer}>
                <CameraView
                  style={styles.pipCamera}
                  facing={facing === "back" ? "front" : "back"}
                />
              </View>
            )}

            <View
              style={styles.overlayContainer}
              {...webDomProps("camera-overlay-container", "camera-overlay-container")}
            >
              <View
                style={styles.topControls}
                {...webDomProps("camera-top-controls", "camera-top-controls")}
              >
                {isRecording && (
                  <View
                    style={{
                      backgroundColor: "red",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {formatDuration(recordingDuration)}
                    </Text>
                  </View>
                )}

                {!isRecording && <View />}

                <View
                  style={styles.dualControls}
                  {...webDomProps("camera-dual-controls", "camera-dual-controls")}
                >
                  <Text style={styles.dualText}>Dual Mode</Text>
                  <TouchableOpacity onPress={toggleDualMode}>
                    <Ionicons
                      name={isDualMode ? "checkbox" : "square-outline"}
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>

                  {isDualMode && (
                    <TouchableOpacity
                      style={styles.miniSwap}
                      onPress={toggleCameraFacing}
                    >
                      <Ionicons name="refresh" size={16} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View
                style={styles.overlayCard}
                {...webDomProps("camera-info-card", "camera-info-card")}
              >
                <View
                  style={styles.overlayHeader}
                  {...webDomProps("camera-info-header", "camera-info-header")}
                >
                  <Image
                    source={require("../../../assets/app-icon.png")}
                    style={styles.appIconSmall}
                    resizeMode="cover"
                  />
                  <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateTimeText}>
                      {dateStr} {timeStr}
                    </Text>
                  </View>
                </View>

                <View
                  style={styles.overlayBody}
                  {...webDomProps("camera-info-body", "camera-info-body")}
                >
                  <View
                    style={styles.mapPreview}
                    {...webDomProps("camera-mini-map", "camera-mini-map")}
                  >
                    {location && mapTileUrl ? (
                      <>
                        <Image
                          source={{ uri: mapTileUrl }}
                          style={styles.mapImage}
                          resizeMode="cover"
                        />
                        <View style={styles.mapPinOverlay}>
                          <LocationPointer size={24} />
                        </View>
                        <View style={styles.mapAttributionBadge}>
                          <Text numberOfLines={1} style={styles.mapAttributionText}>
                            {MAP_TILE_ATTRIBUTION}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.mapRefreshButton}
                          onPress={refreshLocation}
                          disabled={isRefreshingLocation}
                          accessibilityLabel="Refresh current location"
                        >
                          {isRefreshingLocation ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Ionicons name="locate" size={11} color="#fff" />
                          )}
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <Ionicons name="map" size={32} color="#888" />
                        <TouchableOpacity
                          style={styles.mapRefreshButton}
                          onPress={refreshLocation}
                          disabled={isRefreshingLocation}
                          accessibilityLabel="Refresh current location"
                        >
                          {isRefreshingLocation ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Ionicons name="locate" size={11} color="#fff" />
                          )}
                        </TouchableOpacity>
                      </>
                    )}
                  </View>

                  <View
                    style={styles.addressBox}
                    {...webDomProps("camera-address-box", "camera-address-box")}
                  >
                    <View
                      style={styles.addressTitleRow}
                      {...webDomProps("camera-address-line1-row", "camera-address-line-row")}
                    >
                      <AutoScrollText
                        text={addressLine1}
                        containerStyle={styles.addressTickerContainer}
                        textStyle={styles.addressSingleLineText}
                        containerProps={webDomProps(
                          "camera-address-line1-scroll",
                          "camera-address-scroll",
                        )}
                        textProps={webDomProps(
                          "camera-address-line1",
                          "camera-address-line camera-address-line-primary",
                        )}
                      />
                    </View>
                    {addressLine2 ? (
                      <View
                        style={styles.addressSubRow}
                        {...webDomProps("camera-address-line2-row", "camera-address-line-row")}
                      >
                        <AutoScrollText
                          text={addressLine2}
                          containerStyle={styles.addressTickerContainer}
                          textStyle={styles.addressSingleLineSubText}
                          containerProps={webDomProps(
                            "camera-address-line2-scroll",
                            "camera-address-scroll",
                          )}
                          textProps={webDomProps(
                            "camera-address-line2",
                            "camera-address-line camera-address-line-secondary",
                          )}
                        />
                      </View>
                    ) : null}
                    {locationError && (
                      <Text style={styles.locationErrorText}>{locationError}</Text>
                    )}
                  </View>
                </View>

                <View
                  style={styles.overlayFooter}
                  {...webDomProps("camera-meta-footer", "camera-meta-footer")}
                >
                  <View
                    style={styles.pill}
                    {...webDomProps("camera-pill-weather", "camera-meta-pill camera-meta-pill-weather")}
                  >
                    <Ionicons name="sunny" size={12} color="white" />
                    <Text
                      style={styles.pillText}
                      {...webDomProps("camera-pill-weather-text", "camera-meta-pill-text")}
                    >
                      {weather ? `${weather.temperature} C` : "-- C"}
                    </Text>
                  </View>
                  <View
                    style={styles.pill}
                    {...webDomProps("camera-pill-lat", "camera-meta-pill camera-meta-pill-lat")}
                  >
                    <Ionicons name="pin-outline" size={12} color="white" />
                    <Text
                      style={styles.pillText}
                      {...webDomProps("camera-pill-lat-text", "camera-meta-pill-text")}
                    >
                      {latitudeText}
                    </Text>
                  </View>
                  <View
                    style={styles.pill}
                    {...webDomProps("camera-pill-lon", "camera-meta-pill camera-meta-pill-lon")}
                  >
                    <Ionicons name="navigate-outline" size={12} color="white" />
                    <Text
                      style={styles.pillText}
                      {...webDomProps("camera-pill-lon-text", "camera-meta-pill-text")}
                    >
                      {longitudeText}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </CameraView>
        </ViewShot>
      </View>

      <View
        style={styles.controlsContainer}
        {...webDomProps("camera-bottom-controls", "camera-bottom-controls")}
      >
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Ionicons
            name={flash === "on" ? "flash" : "flash-off"}
            size={24}
            color={flash === "on" ? "#FFD700" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleAction}
          disabled={mode === "picture" && isCapturing}
        >
          <View style={styles.captureButtonOuter}>
            {mode === "picture" ? (
              <View
                style={[styles.captureButton, isCapturing && styles.captureActive]}
              />
            ) : (
              <View
                style={[
                  styles.captureButton,
                  { backgroundColor: isRecording ? "transparent" : "#FF4040" },
                  isRecording && {
                    borderRadius: 4,
                    width: 30,
                    height: 30,
                    backgroundColor: "#FF4040",
                  },
                ]}
              >
                {isRecording && (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "red",
                      borderRadius: 4,
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
