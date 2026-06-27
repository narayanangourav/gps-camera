import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import {
  responsiveHeightValue,
  responsiveValue,
} from "../../logics/responsive.logic";
import { appTheme } from "../../logics/theme.logic";

export const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const logoSize = Math.min(
    responsiveValue(width, {
      mobile: 104,
      tablet: 132,
      desktop: 152,
    }),
    responsiveHeightValue(height, {
      compact: 80,
      regular: 108,
      tall: 132,
    }),
  );
  const titleSize = Math.min(
    responsiveValue(width, {
      mobile: 34,
      tablet: 42,
      desktop: 48,
    }),
    responsiveHeightValue(height, {
      compact: 28,
      regular: 38,
      tall: 44,
    }),
  );
  const subtitleSize = Math.min(
    responsiveValue(width, {
      mobile: 15,
      tablet: 16,
      desktop: 18,
    }),
    responsiveHeightValue(height, {
      compact: 13,
      regular: 15,
      tall: 17,
    }),
  );

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: appTheme.colors.background,
          overflow: "hidden",
        },
        background: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        content: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: responsiveValue(width, {
            mobile: 20,
            tablet: 36,
            desktop: 56,
          }),
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 480,
            tablet: 760,
            desktop: 1120,
          }),
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: responsiveHeightValue(height, {
            compact: 16,
            regular: 24,
            tall: 40,
          }),
          paddingBottom: responsiveHeightValue(height, {
            compact: 28,
            regular: 40,
            tall: 56,
          }),
        },
        heroContent: {
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 360,
            tablet: 560,
            desktop: 680,
          }),
          alignItems: "center",
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: appTheme.colors.surface,
          borderRadius: 28,
          paddingHorizontal: responsiveValue(width, {
            mobile: 22,
            tablet: 30,
            desktop: 36,
          }),
          paddingVertical: responsiveHeightValue(height, {
            compact: 22,
            regular: 28,
            tall: 36,
          }),
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          shadowColor: "rgba(15, 23, 42, 0.12)",
          shadowOffset: { width: 0, height: 16 },
          shadowOpacity: 1,
          shadowRadius: 36,
          elevation: 8,
        },
        iconContainer: {
          marginBottom: responsiveHeightValue(height, {
            compact: 14,
            regular: 20,
            tall: 24,
          }),
          alignSelf: "center",
          borderRadius: logoSize / 2,
          padding: 10,
          backgroundColor: appTheme.colors.surfaceStrong,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        logoImage: {
          width: logoSize,
          height: logoSize,
        },
        title: {
          fontSize: titleSize,
          fontWeight: "800",
          color: appTheme.colors.textPrimary,
          textAlign: "center",
          marginBottom: 6,
          letterSpacing: -0.6,
        },
        eyebrow: {
          color: appTheme.colors.iconPrimary,
          fontSize: responsiveValue(width, {
            mobile: 12,
            tablet: 13,
            desktop: 14,
          }),
          fontWeight: "700",
          letterSpacing: 0.8,
          textTransform: "uppercase",
          marginBottom: responsiveHeightValue(height, {
            compact: 10,
            regular: 12,
            tall: 14,
          }),
        },
        subtitle: {
          fontSize: subtitleSize,
          color: appTheme.colors.textSecondary,
          textAlign: "center",
          lineHeight: responsiveHeightValue(height, {
            compact: 20,
            regular: 24,
            tall: 28,
          }),
          marginBottom: responsiveHeightValue(height, {
            compact: 16,
            regular: 22,
            tall: 28,
          }),
          maxWidth: responsiveValue(width, {
            mobile: 340,
            tablet: 500,
            desktop: 560,
          }),
        },
        featurePanel: {
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 340,
            tablet: 500,
            desktop: 560,
          }),
          backgroundColor: appTheme.colors.surfaceMuted,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          borderRadius: 20,
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 18,
            desktop: 20,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 12,
            tablet: 14,
            desktop: 16,
          }),
          marginBottom: responsiveHeightValue(height, {
            compact: 16,
            regular: 22,
            tall: 26,
          }),
        },
        primaryAction: {
          width: "100%",
          borderRadius: 18,
          overflow: "hidden",
          marginBottom: responsiveHeightValue(height, {
            compact: 12,
            regular: 14,
            tall: 18,
          }),
        },
        primaryActionGradient: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingVertical: responsiveValue(width, {
            mobile: 14,
            tablet: 16,
            desktop: 18,
          }),
        },
        primaryActionText: {
          color: appTheme.colors.textOnDark,
          fontWeight: "800",
          fontSize: responsiveValue(width, {
            mobile: 15,
            tablet: 16,
            desktop: 17,
          }),
        },
        metaNote: {
          color: appTheme.colors.textMuted,
          textAlign: "center",
          fontSize: responsiveValue(width, {
            mobile: 12,
            tablet: 12,
            desktop: 13,
          }),
          lineHeight: responsiveValue(width, {
            mobile: 18,
            tablet: 18,
            desktop: 20,
          }),
        },
      }),
    [height, logoSize, subtitleSize, titleSize, width],
  );
};
