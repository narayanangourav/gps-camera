import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { appTheme } from "../../logics/theme.logic";

export const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: appTheme.colors.background },
        content: {
          width: "100%",
          maxWidth: 880,
          alignSelf: "center",
          padding: 20,
          gap: 16,
        },
        backButtonWrap: { alignSelf: "flex-start" },
        backButton: {
          color: appTheme.colors.textSecondary,
          fontWeight: "700",
          backgroundColor: appTheme.colors.surfaceStrong,
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
        sectionCard: {
          backgroundColor: appTheme.colors.surfaceStrong,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          padding: 18,
          gap: 12,
        },
        sectionTitle: {
          color: appTheme.colors.textPrimary,
          fontSize: 16,
          fontWeight: "800",
        },
        sectionHint: {
          color: appTheme.colors.textMuted,
          fontSize: 13,
          lineHeight: 19,
        },
        row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
        optionButton: {
          minWidth: 72,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 12,
          backgroundColor: appTheme.colors.surfaceMuted,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        optionButtonActive: {
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          borderColor: appTheme.colors.iconPrimary,
        },
        optionButtonText: {
          color: appTheme.colors.textPrimary,
          fontWeight: "700",
        },
        toggleButton: {
          borderRadius: 14,
          backgroundColor: appTheme.colors.iconPrimary,
          paddingVertical: 14,
          alignItems: "center",
        },
        toggleButtonText: {
          color: appTheme.colors.textOnDark,
          fontWeight: "800",
        },
        input: {
          borderRadius: 14,
          backgroundColor: appTheme.colors.surfaceMuted,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          paddingHorizontal: 14,
          paddingVertical: 12,
          color: appTheme.colors.textPrimary,
        },
        fieldRow: {
          borderRadius: 14,
          backgroundColor: appTheme.colors.surfaceMuted,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          paddingHorizontal: 14,
          paddingVertical: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        fieldLabel: {
          color: appTheme.colors.textPrimary,
          fontWeight: "600",
        },
        fieldState: {
          color: appTheme.colors.textSecondary,
          fontWeight: "700",
        },
      }),
    [],
  );
