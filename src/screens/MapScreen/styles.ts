import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { appTheme } from "../../logics/theme.logic";

export const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: appTheme.colors.background },
        header: {
          width: "100%",
          maxWidth: 1100,
          alignSelf: "center",
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 12,
          gap: 8,
        },
        headerAction: {
          color: appTheme.colors.textSecondary,
          fontWeight: "700",
          backgroundColor: appTheme.colors.surfaceStrong,
          alignSelf: "flex-start",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          overflow: "hidden",
        },
        title: {
          color: appTheme.colors.textPrimary,
          fontSize: 28,
          fontWeight: "800",
        },
        mapContainer: {
          flex: 1,
          width: "100%",
          maxWidth: 1100,
          alignSelf: "center",
          marginHorizontal: 20,
          marginBottom: 16,
          borderRadius: 24,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          backgroundColor: appTheme.colors.surfaceStrong,
        },
        emptyState: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appTheme.colors.surfaceStrong,
        },
        emptyStateText: { color: appTheme.colors.textSecondary },
        actions: {
          width: "100%",
          maxWidth: 1100,
          alignSelf: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
          flexDirection: "row",
          gap: 12,
        },
        actionButton: {
          flex: 1,
          borderRadius: 16,
          backgroundColor: appTheme.colors.surfaceStrong,
          paddingVertical: 14,
          alignItems: "center",
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        actionButtonText: {
          color: appTheme.colors.textPrimary,
          fontWeight: "800",
        },
      }),
    [],
  );
