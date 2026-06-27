import React from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { CameraView } from "expo-camera";
import ViewShot from "react-native-view-shot";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../App";
import CameraBottomControls from "../../components/CameraBottomControls";
import CameraScreenOverlay from "../../components/CameraScreenOverlay";
import { useCameraLogic } from "../../logics/camera.logic";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Camera">;

export default function CameraScreen({ route }: Props) {
  const styles = useStyles();
  const mode = route.params?.mode || "picture";
  const {
    cameraPermission,
    location,
    addressLines,
    weather,
    countdownRemaining,
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
    refreshLocation,
    handleAction,
    toggleCameraFacing,
    toggleFlash,
    toggleDualMode,
    formatDuration,
    stampConfig,
    selectedProjectName,
    locationMode,
  } = useCameraLogic(mode);

  if (!cameraPermission) {
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
      <StatusBar
        barStyle="light-content"
        backgroundColor={appTheme.colors.cameraBackdrop}
      />

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
            <CameraScreenOverlay
              styles={styles}
              dateStr={dateStr}
              timeStr={timeStr}
              selectedProjectName={selectedProjectName}
              countdownRemaining={countdownRemaining}
              isRecording={isRecording}
              recordingDuration={recordingDuration}
              formatDuration={formatDuration}
              isDualMode={isDualMode}
              toggleDualMode={toggleDualMode}
              toggleCameraFacing={toggleCameraFacing}
              locationMode={locationMode}
              locationError={locationError}
              addressLine1={addressLines.line1}
              addressLine2={addressLines.line2}
              location={location}
              weather={weather}
              stampConfig={stampConfig}
              isRefreshingLocation={isRefreshingLocation}
              refreshLocation={refreshLocation}
            />
          </CameraView>
        </ViewShot>
      </View>
      <CameraBottomControls
        styles={styles}
        flash={flash}
        isCapturing={isCapturing}
        isRecording={isRecording}
        mode={mode}
        toggleFlash={toggleFlash}
        handleAction={handleAction}
        toggleCameraFacing={toggleCameraFacing}
      />
    </SafeAreaView>
  );
}
