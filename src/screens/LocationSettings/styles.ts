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
          maxWidth: 880,
          alignSelf: "center",
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 12,
        },
        backButton: {
          alignSelf: "flex-start",
          backgroundColor: appTheme.colors.surfaceStrong,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 12,
        },
        backButtonText: {
          color: appTheme.colors.textSecondary,
          fontWeight: "700",
        },
        title: {
          color: appTheme.colors.textPrimary,
          fontSize: 28,
          fontWeight: "800",
        },
        content: {
          width: "100%",
          maxWidth: 880,
          alignSelf: "center",
          paddingHorizontal: 20,
          paddingBottom: 28,
          gap: 16,
        },
        sectionCard: {
          backgroundColor: appTheme.colors.surfaceStrong,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          padding: 18,
          gap: 12,
        },
        subtitle: {
          color: appTheme.colors.textSecondary,
          fontSize: 14,
          lineHeight: 20,
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
        modeRow: { flexDirection: "row", gap: 12 },
        modeButton: {
          flex: 1,
          borderRadius: 16,
          paddingVertical: 14,
          alignItems: "center",
          backgroundColor: appTheme.colors.surfaceMuted,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        modeButtonActive: {
          backgroundColor: appTheme.colors.surfaceOverlayStrong,
          borderColor: appTheme.colors.iconPrimary,
        },
        modeButtonText: {
          color: appTheme.colors.textPrimary,
          fontWeight: "700",
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
        primaryButton: {
          borderRadius: 16,
          backgroundColor: appTheme.colors.iconPrimary,
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 4,
        },
        primaryButtonText: {
          color: appTheme.colors.textOnDark,
          fontWeight: "800",
        },
        secondaryButton: {
          borderRadius: 16,
          backgroundColor: appTheme.colors.surfaceStrong,
          paddingVertical: 14,
          alignItems: "center",
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
        },
        secondaryButtonText: {
          color: appTheme.colors.textSecondary,
          fontWeight: "700",
        },
      }),
    [],
  );
