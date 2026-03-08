import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0c29",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
  iconContainer: {
    marginBottom: 40,
    alignSelf: "center",
    shadowColor: "#4DACFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#B0B0E0",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 50,
  },
  featureList: {
    alignSelf: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    right: 30,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  gradientButton: {
    flex: 1,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
