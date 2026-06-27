import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashMode } from "expo-camera";

import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "../../screens/CameraScreen/styles";

type CameraBottomControlsProps = {
  styles: ReturnType<typeof useStyles>;
  flash: FlashMode;
  isCapturing: boolean;
  isRecording: boolean;
  mode: "picture" | "video";
  toggleFlash: () => void;
  handleAction: () => void;
  toggleCameraFacing: () => void;
};

export default function CameraBottomControls(props: CameraBottomControlsProps) {
  return (
    <View
      style={props.styles.controlsContainer}
      {...webDomProps("camera-bottom-controls", "camera-bottom-controls")}
    >
      <TouchableOpacity style={props.styles.controlButton} onPress={props.toggleFlash}>
        <Ionicons
          name={props.flash === "on" ? "flash" : "flash-off"}
          size={24}
          color={
            props.flash === "on"
              ? appTheme.colors.iconPrimary
              : appTheme.colors.textPrimary
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.handleAction}
        disabled={props.mode === "picture" && props.isCapturing}
      >
        <View style={props.styles.captureButtonOuter}>
          {props.mode === "picture" ? (
            <View
              style={[
                props.styles.captureButton,
                props.isCapturing && props.styles.captureActive,
              ]}
            />
          ) : (
            <View
              style={[
                props.styles.captureButton,
                props.isRecording
                  ? props.styles.captureButtonRecording
                  : props.styles.captureButtonVideoIdle,
              ]}
            >
              {props.isRecording ? (
                <View style={props.styles.captureButtonRecordingInner} />
              ) : null}
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={props.styles.controlButton} onPress={props.toggleCameraFacing}>
        <Ionicons name="camera-reverse" size={24} color={appTheme.colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}
