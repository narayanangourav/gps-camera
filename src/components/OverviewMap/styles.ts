import { StyleSheet } from "react-native";

import { appTheme } from "../../logics/theme.logic";

export const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    backgroundColor: appTheme.colors.mapPlaceholder,
  },
  tileLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  tileImage: {
    position: "absolute",
    width: 256,
    height: 256,
  },
  webPin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -15,
    marginTop: -36,
  },
});
