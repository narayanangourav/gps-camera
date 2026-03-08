import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
    position: "relative",
  },
  tileLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  tileImage: {
    position: "absolute",
  },
  pin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    pointerEvents: "none",
  },
});
