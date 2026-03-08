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
      mobile: 112,
      tablet: 140,
      desktop: 164,
    }),
    responsiveHeightValue(height, {
      compact: 84,
      regular: 118,
      tall: 150,
    }),
  );
  const titleSize = Math.min(
    responsiveValue(width, {
      mobile: 34,
      tablet: 42,
      desktop: 50,
    }),
    responsiveHeightValue(height, {
      compact: 28,
      regular: 38,
      tall: 48,
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
            compact: 12,
            regular: 24,
            tall: 40,
          }),
          paddingBottom: responsiveHeightValue(height, {
            compact: 76,
            regular: 96,
            tall: 112,
          }),
        },
        heroContent: {
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 340,
            tablet: 520,
            desktop: 620,
          }),
          alignItems: "center",
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
        },
        iconContainer: {
          marginBottom: responsiveHeightValue(height, {
            compact: 16,
            regular: 28,
            tall: 40,
          }),
          alignSelf: "center",
          shadowColor: appTheme.colors.shadow,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 10,
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
          marginBottom: responsiveHeightValue(height, {
            compact: 8,
            regular: 14,
            tall: 18,
          }),
          letterSpacing: 1,
        },
        subtitle: {
          fontSize: subtitleSize,
          color: appTheme.colors.textSecondary,
          textAlign: "center",
          lineHeight: responsiveHeightValue(height, {
            compact: 18,
            regular: 22,
            tall: 26,
          }),
          marginBottom: responsiveHeightValue(height, {
            compact: 18,
            regular: 30,
            tall: 44,
          }),
          maxWidth: responsiveValue(width, {
            mobile: 340,
            tablet: 520,
            desktop: 620,
          }),
        },
        featureList: {
          width: "auto",
          maxWidth: responsiveValue(width, {
            mobile: 340,
            tablet: 520,
            desktop: 620,
          }),
          alignSelf: "center",
          alignItems: "flex-start",
          paddingHorizontal: responsiveValue(width, {
            mobile: 0,
            tablet: 10,
            desktop: 12,
          }),
        },
        buttonContainer: {
          position: "absolute",
          bottom: responsiveHeightValue(height, {
            compact: 12,
            regular: 24,
            tall: 36,
          }),
          right: responsiveValue(width, {
            mobile: 20,
            tablet: 30,
            desktop: 40,
          }),
        },
        nextButton: {
          width: responsiveValue(width, {
            mobile: 52,
            tablet: 56,
            desktop: 64,
          }),
          height: responsiveValue(width, {
            mobile: 52,
            tablet: 56,
            desktop: 64,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 26,
            tablet: 28,
            desktop: 32,
          }),
          shadowColor: appTheme.colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        },
        gradientButton: {
          flex: 1,
          borderRadius: responsiveValue(width, {
            mobile: 26,
            tablet: 28,
            desktop: 32,
          }),
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [height, logoSize, subtitleSize, titleSize, width],
  );
};
