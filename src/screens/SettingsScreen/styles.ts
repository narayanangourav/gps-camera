import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import {
  responsiveHeightValue,
  responsiveValue,
} from "../../logics/responsive.logic";
import { appTheme } from "../../logics/theme.logic";

export const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: appTheme.colors.background,
          alignItems: "center",
          overflow: "hidden",
        },
        body: {
          flex: 1,
          width: "100%",
          minHeight: 0,
        },
        scroll: {
          flex: 1,
          width: "100%",
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 560,
            tablet: 860,
            desktop: 980,
          }),
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 24,
            desktop: 28,
          }),
          paddingVertical: responsiveHeightValue(height, {
            compact: 10,
            regular: 14,
            tall: 18,
          }),
          marginTop: 0,
        },
        backButton: {
          width: responsiveValue(width, {
            mobile: 38,
            tablet: 40,
            desktop: 44,
          }),
          height: responsiveValue(width, {
            mobile: 38,
            tablet: 40,
            desktop: 44,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 19,
            tablet: 20,
            desktop: 22,
          }),
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          justifyContent: "center",
          alignItems: "center",
        },
        headerTitle: {
          fontSize: responsiveValue(width, {
            mobile: 18,
            tablet: 20,
            desktop: 22,
          }),
          fontWeight: "bold",
          color: appTheme.colors.textPrimary,
        },
        headerSpacer: {
          width: responsiveValue(width, {
            mobile: 38,
            tablet: 40,
            desktop: 44,
          }),
        },
        content: {
          width: "100%",
          maxWidth: responsiveValue(width, {
            mobile: 560,
            tablet: 860,
            desktop: 980,
          }),
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
          flexGrow: 1,
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 20,
            desktop: 28,
          }),
          paddingBottom: responsiveHeightValue(height, {
            compact: 20,
            regular: 32,
            tall: 48,
          }),
        },
        menuGroup: {
          backgroundColor: appTheme.colors.surfaceStrong,
          borderRadius: responsiveValue(width, {
            mobile: 14,
            tablet: 16,
            desktop: 20,
          }),
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          overflow: "hidden",
        },
        menuItem: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: responsiveValue(width, {
            mobile: 14,
            tablet: 16,
            desktop: 18,
          }),
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 20,
            desktop: 24,
          }),
          backgroundColor: "transparent",
        },
        menuItemBorder: {
          borderBottomWidth: 1,
          borderBottomColor: appTheme.colors.borderSoft,
        },
        detailsContainer: {
          paddingHorizontal: responsiveValue(width, {
            mobile: 16,
            tablet: 20,
            desktop: 24,
          }),
          paddingBottom: responsiveValue(width, {
            mobile: 16,
            tablet: 20,
            desktop: 24,
          }),
          backgroundColor: appTheme.colors.surface,
        },
        detailsText: {
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 13,
            tablet: 14,
            desktop: 15,
          }),
          lineHeight: responsiveValue(width, {
            mobile: 19,
            tablet: 20,
            desktop: 22,
          }),
          marginBottom: 15,
        },
        actionButton: {
          borderWidth: 1,
          paddingVertical: responsiveValue(width, {
            mobile: 8,
            tablet: 8,
            desktop: 10,
          }),
          paddingHorizontal: responsiveValue(width, {
            mobile: 14,
            tablet: 16,
            desktop: 18,
          }),
          borderRadius: 20,
          alignSelf: "flex-start",
        },
        actionButtonText: {
          fontWeight: "600",
          fontSize: responsiveValue(width, {
            mobile: 13,
            tablet: 14,
            desktop: 15,
          }),
        },
        iconBox: {
          width: responsiveValue(width, {
            mobile: 34,
            tablet: 36,
            desktop: 40,
          }),
          height: responsiveValue(width, {
            mobile: 34,
            tablet: 36,
            desktop: 40,
          }),
          borderRadius: responsiveValue(width, {
            mobile: 17,
            tablet: 18,
            desktop: 20,
          }),
          justifyContent: "center",
          alignItems: "center",
          marginRight: responsiveValue(width, {
            mobile: 12,
            tablet: 16,
            desktop: 18,
          }),
        },
        textContainer: {
          flex: 1,
        },
        itemTitle: {
          fontSize: responsiveValue(width, {
            mobile: 15,
            tablet: 16,
            desktop: 17,
          }),
          color: appTheme.colors.textPrimary,
          fontWeight: "500",
        },
        itemSubtitle: {
          fontSize: responsiveValue(width, {
            mobile: 11,
            tablet: 12,
            desktop: 13,
          }),
          color: appTheme.colors.textMuted,
          marginTop: 2,
        },
        versionContainer: {
          marginTop: responsiveValue(width, {
            mobile: 24,
            tablet: 30,
            desktop: 34,
          }),
          alignItems: "center",
        },
        versionText: {
          color: appTheme.colors.textSecondary,
          fontSize: responsiveValue(width, {
            mobile: 13,
            tablet: 14,
            desktop: 15,
          }),
        },
      }),
    [height, width],
  );
};
