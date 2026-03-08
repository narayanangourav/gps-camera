import { useMemo } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";

import {
  isCompactScreen,
  isShortScreen,
  responsiveHeightValue,
  responsiveValue,
} from "../../logics/responsive.logic";
import { appTheme } from "../../logics/theme.logic";

export const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const compact = isCompactScreen(width);
  const shortScreen = isShortScreen(height);
  const stackModes = compact && (width < 560 || !shortScreen);
  const compactInlineCards = compact && !stackModes;
  const mapMinHeight = responsiveHeightValue(height, {
    compact: 180,
    regular: 240,
    tall: 320,
  });
  const mapPreferredHeight = responsiveHeightValue(height, {
    compact: 220,
    regular: 300,
    tall: 420,
  });
  const mapHeight = Math.max(
    mapMinHeight,
    Math.min(
      mapPreferredHeight,
      height -
        responsiveHeightValue(height, {
          compact: 250,
          regular: 320,
          tall: 380,
        }),
    ),
  );

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          width: "100%",
          alignItems: "center",
          overflow: "hidden",
        },
        content: {
          flex: 1,
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 520,
            tablet: 860,
            desktop: 1240,
          }),
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 24,
            desktop: 32,
          }),
          paddingTop: responsiveHeightValue(height, {
            compact: 12,
            regular: 16,
            tall: 24,
          }),
          paddingBottom: responsiveHeightValue(height, {
            compact: 12,
            regular: 20,
            tall: 28,
          }),
          minHeight: 0,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: responsiveHeightValue(height, {
            compact: 12,
            regular: 20,
            tall: 30,
          }),
          marginTop:
            Platform.OS === "android"
              ? responsiveHeightValue(height, {
                  compact: 18,
                  regular: 28,
                  tall: 36,
                })
              : 0,
        },
        greeting: {
          fontSize: responsiveValue(width, {
            mobile: 14,
            tablet: 16,
            desktop: 17,
          }),
          color: appTheme.colors.textSecondary,
          marginBottom: 4,
        },
        appName: {
          fontSize: responsiveValue(width, {
            mobile: 24,
            tablet: 28,
            desktop: 32,
          }),
          fontWeight: "bold",
          color: appTheme.colors.textPrimary,
          letterSpacing: 0.5,
        },
        settingsButton: {
          width: responsiveValue(width, {
            mobile: 42,
            tablet: 44,
            desktop: 48,
          }),
          height: responsiveValue(width, {
            mobile: 42,
            tablet: 44,
            desktop: 48,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 21,
            tablet: 22,
            desktop: 24,
          }),
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          justifyContent: "center",
          alignItems: "center",
        },
        sectionTitle: {
          fontSize: responsiveValue(width, {
            mobile: 16,
            tablet: 18,
            desktop: 20,
          }),
          fontWeight: "600",
          color: appTheme.colors.textPrimary,
          marginBottom: responsiveHeightValue(height, {
            compact: 10,
            regular: 14,
            tall: 16,
          }),
          letterSpacing: 0.5,
        },
        modesContainer: {
          width: "100%",
          flexDirection: stackModes ? "column" : "row",
          gap: responsiveValue(width, {
            mobile: shortScreen ? 10 : 12,
            tablet: 16,
            desktop: 20,
          }),
          marginBottom: responsiveHeightValue(height, {
            compact: 12,
            regular: 20,
            tall: 28,
          }),
        },
        modeCard: {
          flex: stackModes ? undefined : 1,
          minWidth: stackModes ? undefined : 0,
          width: stackModes ? "100%" : undefined,
          minHeight: responsiveHeightValue(height, {
            compact: compactInlineCards ? 112 : 88,
            regular: 98,
            tall: 118,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 18,
            tablet: 22,
            desktop: 24,
          }),
          overflow: "hidden",
          shadowColor: appTheme.colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        modeGradient: {
          flex: 1,
          borderRadius: responsiveValue(width, {
            mobile: 18,
            tablet: 22,
            desktop: 24,
          }),
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 18,
            desktop: 20,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 16,
            tablet: 18,
            desktop: 20,
          }),
          justifyContent: "center",
        },
        modeContent: {
          flex: 1,
          flexDirection: compactInlineCards ? "column" : "row",
          alignItems: compactInlineCards ? "flex-start" : "center",
          justifyContent: "center",
          gap: responsiveValue(width, {
            mobile: 14,
            tablet: 16,
            desktop: 18,
          }),
        },
        iconCircle: {
          width: responsiveValue(width, {
            mobile: 50,
            tablet: 54,
            desktop: 58,
          }),
          height: responsiveValue(width, {
            mobile: 50,
            tablet: 54,
            desktop: 58,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 25,
            tablet: 27,
            desktop: 29,
          }),
          backgroundColor: appTheme.colors.surfaceStrong,
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        },
        modeTextGroup: {
          flex: 1,
          minWidth: 0,
          width: compactInlineCards ? "100%" : undefined,
        },
        modeTitle: {
          fontSize: responsiveValue(width, {
            mobile: compactInlineCards ? 18 : 20,
            tablet: 22,
            desktop: 24,
          }),
          fontWeight: "bold",
          color: appTheme.colors.textPrimary,
        },
        modeSubtitle: {
          fontSize: responsiveValue(width, {
            mobile: 12,
            tablet: 13,
            desktop: 14,
          }),
          color: appTheme.colors.textSecondary,
          fontWeight: "500",
          marginTop: 4,
        },
        locationContainer: {
          flex: 1,
          width: "100%",
          minHeight: 0,
        },
        locationCard: {
          flex: 1,
          width: "100%",
          height: mapHeight,
          minHeight: mapMinHeight,
          borderRadius: responsiveValue(width, {
            mobile: 20,
            tablet: 24,
            desktop: 28,
          }),
          overflow: "hidden",
          position: "relative",
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          backgroundColor: appTheme.colors.surface,
        },
        mapIconHeader: {
          position: "absolute",
          top: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          left: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          zIndex: 2,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: appTheme.colors.surfaceStrong,
          alignSelf: "flex-start",
          paddingHorizontal: responsiveValue(width, {
            mobile: 8,
            tablet: 10,
            desktop: 12,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 4,
            tablet: 4,
            desktop: 5,
          }),
          borderRadius: 12,
        },
        pulsingDot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: appTheme.colors.live,
          marginRight: 6,
        },
        liveText: {
          color: appTheme.colors.textPrimary,
          fontSize: responsiveValue(width, {
            mobile: 10,
            tablet: 10,
            desktop: 11,
          }),
          fontWeight: "bold",
        },
        mapStatus: {
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
          justifyContent: "center",
        },
        mapStatusText: {
          marginTop: 10,
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 12,
            tablet: 12,
            desktop: 13,
          }),
          textAlign: "center",
          paddingHorizontal: 16,
        },
        mapControls: {
          position: "absolute",
          right: responsiveValue(width, {
            mobile: 8,
            tablet: 10,
            desktop: 12,
          }),
          bottom: responsiveValue(width, {
            mobile: 8,
            tablet: 10,
            desktop: 12,
          }),
          alignItems: "center",
          zIndex: 2,
        },
        mapControlButton: {
          width: responsiveValue(width, {
            mobile: 32,
            tablet: 34,
            desktop: 38,
          }),
          height: responsiveValue(width, {
            mobile: 32,
            tablet: 34,
            desktop: 38,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 16,
            tablet: 17,
            desktop: 19,
          }),
          backgroundColor: appTheme.colors.surfaceStrong,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 6,
          borderWidth: 1,
          borderColor: appTheme.colors.border,
        },
        mapControlButtonDisabled: {
          opacity: 0.65,
        },
        locationDetails: {
          position: "absolute",
          left: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          bottom: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
          zIndex: 2,
          width: responsiveValue(width, {
            mobile: 190,
            tablet: 220,
            desktop: 280,
          }),
          backgroundColor: appTheme.colors.surfaceStrong,
          borderRadius: 10,
          paddingHorizontal: responsiveValue(width, {
            mobile: 10,
            tablet: 10,
            desktop: 12,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 8,
            tablet: 8,
            desktop: 10,
          }),
          borderWidth: 1,
          borderColor: appTheme.colors.border,
        },
        locationDetailsText: {
          color: appTheme.colors.textPrimary,
          fontSize: responsiveValue(width, {
            mobile: 11,
            tablet: 12,
            desktop: 13,
          }),
          fontWeight: "600",
          lineHeight: responsiveValue(width, {
            mobile: 15,
            tablet: 16,
            desktop: 17,
          }),
        },
        locationDetailsMeta: {
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 10,
            tablet: 11,
            desktop: 12,
          }),
          marginTop: 2,
        },
        locationWarning: {
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 10,
            tablet: 11,
            desktop: 12,
          }),
          marginTop: 3,
          maxWidth: responsiveValue(width, {
            mobile: 170,
            tablet: 190,
            desktop: 240,
          }),
        },
      }),
    [
      compact,
      compactInlineCards,
      height,
      mapHeight,
      mapMinHeight,
      shortScreen,
      stackModes,
      width,
    ],
  );
};
