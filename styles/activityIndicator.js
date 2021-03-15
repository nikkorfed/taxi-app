import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    opacity: 0.85,
  },
  activityIndicator: {
    height: 150,
    width: 150,
  },
});
