import { StyleSheet } from "react-native";

const PIN_COLOR = "#1E1A1D";
const CENTER_BG = "#FFFFFF";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  head: {
    backgroundColor: CENTER_BG,
    borderColor: PIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    backgroundColor: CENTER_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  tail: {
    backgroundColor: PIN_COLOR,
    transform: [{ rotate: "45deg" }],
  },
});
