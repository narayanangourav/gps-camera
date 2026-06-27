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
          maxWidth: 960,
          alignSelf: "center",
          padding: 20,
          gap: 14,
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
        headerRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        },
        title: {
          color: appTheme.colors.textPrimary,
          fontSize: 28,
          fontWeight: "800",
        },
        subtitle: {
          color: appTheme.colors.textMuted,
          fontSize: 13,
          marginTop: 6,
        },
        clearButtonWrap: {
          backgroundColor: appTheme.colors.surfaceStrong,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 8,
        },
        clearButton: {
          color: appTheme.colors.textSecondary,
          fontWeight: "700",
        },
        emptyCard: {
          borderRadius: 20,
          backgroundColor: appTheme.colors.surfaceStrong,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          padding: 18,
        },
        emptyText: { color: appTheme.colors.textSecondary, fontSize: 14 },
        card: {
          borderRadius: 20,
          backgroundColor: appTheme.colors.surfaceStrong,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          padding: 16,
          gap: 10,
        },
        thumbnail: {
          width: "100%",
          height: 220,
          borderRadius: 14,
          backgroundColor: appTheme.colors.surfaceMuted,
        },
        cardTitle: {
          color: appTheme.colors.textPrimary,
          fontWeight: "800",
          fontSize: 17,
        },
        cardMeta: { color: appTheme.colors.textSecondary, fontSize: 13 },
        actionsRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
        actionButton: {
          borderRadius: 999,
          backgroundColor: appTheme.colors.surfaceMuted,
          borderWidth: 1,
          borderColor: appTheme.colors.borderSoft,
          paddingHorizontal: 12,
          paddingVertical: 8,
        },
        actionText: { color: appTheme.colors.textPrimary, fontWeight: "700" },
      }),
    [],
  );
