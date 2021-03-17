import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  back: {
    marginTop: 20,
    marginBottom: 20,
  },
  bottomButtons: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "dodgerblue",
  },
  simpleButton: {
    backgroundColor: undefined,
  },
  buttonText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    color: "white",
  },
  agreement: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 12,
    color: "lightgrey",
  },
});
