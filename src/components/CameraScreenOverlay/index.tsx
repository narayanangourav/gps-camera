import React from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AutoScrollText from "../AutoScrollText";
import CameraMetaPills from "../CameraMetaPills";
import MiniMapPreview from "../MiniMapPreview";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { StampConfig } from "../../models/preferences.model";
import { WeatherSnapshot } from "../../models/weather.model";
import { useStyles } from "../../screens/CameraScreen/styles";

type CameraScreenOverlayProps = {
  styles: ReturnType<typeof useStyles>;
  dateStr: string;
  timeStr: string;
  selectedProjectName: string;
  countdownRemaining: number | null;
  isRecording: boolean;
  recordingDuration: number;
  formatDuration: (seconds: number) => string;
  isDualMode: boolean;
  toggleDualMode: () => void;
  toggleCameraFacing: () => void;
  locationMode: string;
  locationError: string | null;
  addressLine1: string;
  addressLine2: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
    altitude: number | null;
  } | null;
  weather: WeatherSnapshot;
  stampConfig: StampConfig;
  isRefreshingLocation: boolean;
  refreshLocation: () => void;
};

export default function CameraScreenOverlay(props: CameraScreenOverlayProps) {
  return (
    <View
      style={props.styles.overlayContainer}
      {...webDomProps("camera-overlay-container", "camera-overlay-container")}
    >
      <View
        style={props.styles.topControls}
        {...webDomProps("camera-top-controls", "camera-top-controls")}
      >
        {props.isRecording ? (
          <View style={props.styles.recordingTimerPill}>
            <Text style={props.styles.recordingTimerText}>
              {props.formatDuration(props.recordingDuration)}
            </Text>
          </View>
        ) : (
          <View />
        )}
        <View
          style={props.styles.dualControls}
          {...webDomProps("camera-dual-controls", "camera-dual-controls")}
        >
          <Text style={props.styles.dualText}>Dual Mode</Text>
          <TouchableOpacity onPress={props.toggleDualMode}>
            <Ionicons
              name={props.isDualMode ? "checkbox" : "square-outline"}
              size={20}
              color={appTheme.colors.textPrimary}
            />
          </TouchableOpacity>
          {props.isDualMode ? (
            <TouchableOpacity style={props.styles.miniSwap} onPress={props.toggleCameraFacing}>
              <Ionicons name="refresh" size={16} color={appTheme.colors.textPrimary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View
        style={props.styles.overlayCard}
        {...webDomProps("camera-info-card", "camera-info-card")}
      >
        <View
          style={props.styles.overlayHeader}
          {...webDomProps("camera-info-header", "camera-info-header")}
        >
          <Image
            source={require("../../../assets/app-logo.png")}
            style={props.styles.appIconSmall}
            resizeMode="cover"
          />
          <View style={props.styles.dateTimeContainer}>
            <Text style={props.styles.dateTimeText}>{props.selectedProjectName}</Text>
            {props.stampConfig.showDateTime ? (
              <Text style={props.styles.dateTimeSubText}>
                {props.dateStr} {props.timeStr}
              </Text>
            ) : null}
          </View>
        </View>
        <View
          style={props.styles.overlayBody}
          {...webDomProps("camera-info-body", "camera-info-body")}
        >
          {props.stampConfig.showMap ? (
            <View
              style={props.styles.mapPreview}
              {...webDomProps("camera-mini-map", "camera-mini-map")}
            >
              {props.location ? (
                <>
                  <MiniMapPreview
                    latitude={props.location.latitude}
                    longitude={props.location.longitude}
                    pinSize={18}
                    scale={0.95}
                    zoom={props.stampConfig.mapZoom}
                  />
                  <TouchableOpacity
                    style={props.styles.mapRefreshButton}
                    onPress={props.refreshLocation}
                    disabled={props.isRefreshingLocation}
                    accessibilityLabel="Refresh current location"
                  >
                    {props.isRefreshingLocation ? (
                      <ActivityIndicator size="small" color={appTheme.colors.textPrimary} />
                    ) : (
                      <Ionicons name="locate" size={11} color={appTheme.colors.textPrimary} />
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <Ionicons name="map" size={32} color={appTheme.colors.textMuted} />
              )}
            </View>
          ) : null}
          <View
            style={props.styles.infoColumn}
            {...webDomProps("camera-info-column", "camera-info-column")}
          >
            <View
              style={props.styles.addressBox}
              {...webDomProps("camera-address-box", "camera-address-box")}
            >
              {props.stampConfig.showAddress ? (
                <>
                  <AutoScrollText
                    text={props.addressLine1}
                    containerStyle={props.styles.addressTickerContainer}
                    textStyle={props.styles.addressSingleLineText}
                  />
                  {props.addressLine2 ? (
                    <AutoScrollText
                      text={props.addressLine2}
                      containerStyle={props.styles.addressTickerContainer}
                      textStyle={props.styles.addressSingleLineSubText}
                    />
                  ) : null}
                </>
              ) : (
                <Text style={props.styles.locationModeText}>
                  {props.locationMode === "manual"
                    ? "Manual location mode"
                    : "Automatic location mode"}
                </Text>
              )}
              {props.locationError ? (
                <Text style={props.styles.locationErrorText}>{props.locationError}</Text>
              ) : null}
            </View>
            <View
              style={props.styles.overlayFooter}
              {...webDomProps("camera-meta-footer", "camera-meta-footer")}
            >
              <CameraMetaPills
                styles={props.styles}
                location={props.location}
                weather={props.weather}
                stampConfig={props.stampConfig}
              />
            </View>
          </View>
        </View>
      </View>
      {props.countdownRemaining !== null ? (
        <View style={props.styles.countdownOverlay}>
          <Text style={props.styles.countdownText}>{props.countdownRemaining}</Text>
        </View>
      ) : null}
    </View>
  );
}
