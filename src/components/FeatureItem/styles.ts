import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import {
  responsiveHeightValue,
  responsiveValue,
} from "../../logics/responsive.logic";
import { appTheme } from "../../logics/theme.logic";

export const useStyles = () => {
  const { width, height } = useWindowDimensions();
  const textSize = Math.min(
    responsiveValue(width, {
      mobile: 14,
      tablet: 16,
      desktop: 17,
    }),
    responsiveHeightValue(height, {
      compact: 13,
      regular: 15,
      tall: 16,
    }),
  );

  return useMemo(
    () =>
      StyleSheet.create({
        featureItem: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: appTheme.colors.surfaceStrong,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          paddingHorizontal: responsiveValue(width, {
            mobile: 12,
            tablet: 14,
            desktop: 16,
          }),
          paddingVertical: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 13,
          }),
          marginBottom: responsiveHeightValue(height, {
            compact: 8,
            regular: 10,
            tall: 12,
          }),
        },
        featureIcon: {
          marginRight: responsiveValue(width, {
            mobile: 10,
            tablet: 12,
            desktop: 14,
          }),
        },
        featureText: {
          color: appTheme.colors.textPrimary,
          fontSize: textSize,
          fontWeight: "600",
          flex: 1,
        },
      }),
    [height, textSize, width],
  );
};
