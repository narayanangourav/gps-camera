import { StyleSheet } from "react-native";

import { appTheme } from "../../logics/theme.logic";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 8,
    bottom: 8,
    zIndex: appTheme.zIndex.attribution,
    backgroundColor: appTheme.colors.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: appTheme.colors.borderSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerCompact: {
    right: 4,
    bottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  text: {
    color: appTheme.colors.textSecondary,
    fontSize: 10,
    fontWeight: "600",
  },
  textCompact: {
    fontSize: 8,
  },
});
