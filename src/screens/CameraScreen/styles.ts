import { useMemo } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";

import { responsiveValue } from "../../logics/responsive.logic";
import { appTheme } from "../../logics/theme.logic";

export const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const desktop = width >= 1200;
  const shortScreen = height < 760;

  return useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: appTheme.colors.cameraBackdrop },
        captureContainer: { flex: 1, backgroundColor: appTheme.colors.cameraBackdrop },
        camera: { flex: 1, justifyContent: "space-between" },
        overlayContainer: {
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: responsiveValue(width, {
            mobile: 12,
            tablet: 20,
            desktop: 28,
          }),
          paddingTop: Platform.OS === "web"
            ? responsiveValue(width, { mobile: 18, tablet: 28, desktop: 36 })
            : responsiveValue(width, { mobile: 32, tablet: 50, desktop: 58 }),
          paddingBottom: responsiveValue(width, {
            mobile: 16,
            tablet: 28,
            desktop: 34,
          }),
        },
        topControls: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 520,
            tablet: 760,
            desktop: 920,
          }),
        },
        overlayCard: {
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 520,
            tablet: 760,
            desktop: 920,
          }),
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: appTheme.colors.surface,
          borderRadius: responsiveValue(width, {
            mobile: 16,
            tablet: 20,
            desktop: 24,
          }),
          padding: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          marginBottom: desktop ? 25 : shortScreen ? 3 : 9,
          marginTop: "auto",
          borderWidth: 1,
          borderColor: appTheme.colors.border,
        },
        overlayHeader: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: responsiveValue(width, {
            mobile: 6,
            tablet: 8,
            desktop: 10,
          }),
        },
        appIconSmall: {
          width: responsiveValue(width, {
            mobile: 34,
            tablet: 40,
            desktop: 44,
          }),
          height: responsiveValue(width, {
            mobile: 34,
            tablet: 40,
            desktop: 44,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 17,
            tablet: 20,
            desktop: 22,
          }),
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        dateTimeContainer: {
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          paddingHorizontal: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 5,
            tablet: 6,
            desktop: 7,
          }),
          borderRadius: 8,
        },
        dateTimeText: {
          color: appTheme.colors.textPrimary,
          fontWeight: "bold",
          fontSize: responsiveValue(width, {
            mobile: 12,
            tablet: 14,
            desktop: 15,
          }),
        },
        overlayBody: {
          flexDirection: "row",
          gap: responsiveValue(width, {
            mobile: 8,
            tablet: 10,
            desktop: 12,
          }),
          marginBottom: responsiveValue(width, {
            mobile: 8,
            tablet: 10,
            desktop: 12,
          }),
        },
        mapPreview: {
          width: responsiveValue(width, {
            mobile: 64,
            tablet: 72,
            desktop: 88,
          }),
          height: responsiveValue(width, {
            mobile: 64,
            tablet: 72,
            desktop: 88,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          overflow: "hidden",
          borderWidth: 1,
          borderColor: appTheme.colors.border,
          backgroundColor: appTheme.colors.mapPlaceholder,
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        },
        mapImage: { width: "100%", height: "100%" },
        mapPinOverlay: {
          position: "absolute",
          top: responsiveValue(width, {
            mobile: 16,
            tablet: 18,
            desktop: 24,
          }),
          left: responsiveValue(width, {
            mobile: 24,
            tablet: 28,
            desktop: 34,
          }),
        },
        mapRefreshButton: {
          position: "absolute",
          top: 2,
          right: 2,
          width: responsiveValue(width, {
            mobile: 18,
            tablet: 18,
            desktop: 20,
          }),
          height: responsiveValue(width, {
            mobile: 18,
            tablet: 18,
            desktop: 20,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 9,
            tablet: 9,
            desktop: 10,
          }),
          backgroundColor: appTheme.colors.surfaceStrong,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        addressBox: {
          flex: 1,
          justifyContent: "center",
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          borderRadius: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          paddingHorizontal: responsiveValue(width, {
            mobile: 6,
            tablet: 8,
            desktop: 10,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 4,
            tablet: 6,
            desktop: 8,
          }),
          minHeight: responsiveValue(width, {
            mobile: 64,
            tablet: 72,
            desktop: 84,
          }),
        },
        addressTitleRow: { flexDirection: "row", alignItems: "center" },
        addressSubRow: { marginTop: 0 },
        addressTickerContainer: { flex: 1, overflow: "hidden" },
        addressSingleLineText: {
          color: appTheme.colors.textPrimary,
          fontWeight: "bold",
          fontSize: responsiveValue(width, {
            mobile: 10,
            tablet: 11,
            desktop: 12,
          }),
        },
        addressSingleLineSubText: {
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 9,
            tablet: 10,
            desktop: 11,
          }),
        },
        locationErrorText: {
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 10,
            tablet: 11,
            desktop: 12,
          }),
          marginTop: 6,
        },
        overlayFooter: {
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: responsiveValue(width, {
            mobile: 6,
            tablet: 8,
            desktop: 10,
          }),
        },
        pill: {
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          paddingHorizontal: responsiveValue(width, {
            mobile: 8,
            tablet: 10,
            desktop: 12,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 4,
            tablet: 5,
            desktop: 6,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        },
        pillText: {
          color: appTheme.colors.textPrimary,
          fontSize: responsiveValue(width, {
            mobile: 10,
            tablet: 11,
            desktop: 12,
          }),
          fontWeight: "600",
        },
        controlsContainer: {
          height: responsiveValue(width, {
            mobile: 116,
            tablet: 132,
            desktop: 144,
          }),
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          paddingBottom: responsiveValue(width, {
            mobile: 12,
            tablet: 18,
            desktop: 24,
          }),
        },
        controlButton: {
          width: responsiveValue(width, {
            mobile: 44,
            tablet: 50,
            desktop: 56,
          }),
          height: responsiveValue(width, {
            mobile: 44,
            tablet: 50,
            desktop: 56,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 22,
            tablet: 25,
            desktop: 28,
          }),
          backgroundColor: appTheme.colors.surfaceMuted,
          justifyContent: "center",
          alignItems: "center",
        },
        captureButtonOuter: {
          width: responsiveValue(width, {
            mobile: 72,
            tablet: 84,
            desktop: 92,
          }),
          height: responsiveValue(width, {
            mobile: 72,
            tablet: 84,
            desktop: 92,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 36,
            tablet: 42,
            desktop: 46,
          }),
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          justifyContent: "center",
          alignItems: "center",
        },
        captureButton: {
          width: responsiveValue(width, {
            mobile: 60,
            tablet: 70,
            desktop: 78,
          }),
          height: responsiveValue(width, {
            mobile: 60,
            tablet: 70,
            desktop: 78,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 30,
            tablet: 35,
            desktop: 39,
          }),
          backgroundColor: appTheme.colors.surfaceStrong,
          shadowColor: appTheme.colors.shadow,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 5,
        },
        captureActive: {
          transform: [{ scale: 0.9 }],
          backgroundColor: appTheme.palette.mist,
        },
        permissionContainer: {
          flex: 1,
          backgroundColor: appTheme.colors.background,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        },
        permissionText: {
          color: appTheme.colors.textPrimary,
          fontSize: responsiveValue(width, {
            mobile: 16,
            tablet: 18,
            desktop: 20,
          }),
          textAlign: "center",
          marginBottom: 20,
          opacity: 0.8,
        },
        dualControls: {
          flexDirection: "row",
          alignItems: "center",
          gap: responsiveValue(width, {
            mobile: 8,
            tablet: 12,
            desktop: 14,
          }),
          backgroundColor: appTheme.colors.surfaceStrong,
          paddingHorizontal: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 5,
            tablet: 6,
            desktop: 7,
          }),
          borderRadius: 20,
        },
        dualText: {
          color: appTheme.colors.textPrimary,
          fontSize: responsiveValue(width, {
            mobile: 11,
            tablet: 12,
            desktop: 13,
          }),
          fontWeight: "600",
        },
        miniSwap: {
          width: responsiveValue(width, {
            mobile: 22,
            tablet: 24,
            desktop: 26,
          }),
          height: responsiveValue(width, {
            mobile: 22,
            tablet: 24,
            desktop: 26,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 11,
            tablet: 12,
            desktop: 13,
          }),
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          justifyContent: "center",
          alignItems: "center",
        },
        pipCameraContainer: {
          position: "absolute",
          top: responsiveValue(width, {
            mobile: 84,
            tablet: 100,
            desktop: 116,
          }),
          left: responsiveValue(width, {
            mobile: 12,
            tablet: 20,
            desktop: 28,
          }),
          width: responsiveValue(width, {
            mobile: 96,
            tablet: 120,
            desktop: 140,
          }),
          height: responsiveValue(width, {
            mobile: 132,
            tablet: 160,
            desktop: 190,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 12,
            tablet: 16,
            desktop: 18,
          }),
          borderWidth: 2,
          borderColor: appTheme.colors.surfaceStrong,
          overflow: "hidden",
          zIndex: 10,
          shadowColor: appTheme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
        },
        pipCamera: { flex: 1 },
      }),
    [desktop, shortScreen, width],
  );
};
