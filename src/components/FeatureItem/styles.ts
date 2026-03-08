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
      mobile: 16,
      tablet: 18,
      desktop: 20,
    }),
    responsiveHeightValue(height, {
      compact: 14,
      regular: 16,
      tall: 18,
    }),
  );

  return useMemo(
    () =>
      StyleSheet.create({
        featureItem: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: responsiveHeightValue(height, {
            compact: 10,
            regular: 16,
            tall: 20,
          }),
        },
        featureIcon: {
          marginRight: responsiveValue(width, {
            mobile: 12,
            tablet: 15,
            desktop: 16,
          }),
        },
        featureText: {
          color: appTheme.colors.textPrimary,
          fontSize: textSize,
          fontWeight: "500",
        },
      }),
    [height, textSize, width],
  );
};
