import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    backgroundColor: "#e8ecef",
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
