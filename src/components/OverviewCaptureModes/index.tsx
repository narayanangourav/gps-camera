import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "../../screens/Overview/styles";

type OverviewCaptureModesProps = {
  styles: ReturnType<typeof useStyles>;
  navigateToCamera: () => void;
  navigateToVideo: () => void;
};

export default function OverviewCaptureModes(props: OverviewCaptureModesProps) {
  return (
    <View
      style={props.styles.modesContainer}
      {...webDomProps("overview-mode-cards", "overview-mode-cards")}
    >
      <TouchableOpacity
        style={props.styles.modeCard}
        onPress={props.navigateToCamera}
        activeOpacity={0.8}
      >
        <LinearGradient colors={appTheme.gradients.secondary} style={props.styles.modeGradient}>
          <View style={props.styles.modeContent}>
            <View style={props.styles.iconCircle}>
              <Ionicons name="camera" size={32} color={appTheme.colors.iconPrimary} />
            </View>
            <View style={props.styles.modeTextGroup}>
              <Text style={props.styles.modeTitle}>Camera</Text>
              <Text style={props.styles.modeSubtitle}>Capture with GPS Tag</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={props.styles.modeCard}
        onPress={props.navigateToVideo}
        activeOpacity={0.8}
      >
        <LinearGradient colors={appTheme.gradients.primary} style={props.styles.modeGradient}>
          <View style={props.styles.modeContent}>
            <View style={props.styles.iconCircle}>
              <Ionicons name="videocam" size={32} color={appTheme.colors.textPrimary} />
            </View>
            <View style={props.styles.modeTextGroup}>
              <Text style={props.styles.modeTitle}>Video</Text>
              <Text style={props.styles.modeSubtitle}>Capture with GPS Tag</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
