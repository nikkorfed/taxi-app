import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default Button = ({ title, onPress, color, shadow, style }) => {
  let buttonStyle = { ...styles.button };
  let buttonTextStyle = { ...styles.buttonText };

  if (color) {
    buttonStyle = { ...buttonStyle, ...styles.color };
    buttonTextStyle = { ...buttonTextStyle, ...styles.white };
  }
  if (shadow) buttonStyle = { ...buttonStyle, ...styles.shadow };
  if (style) buttonStyle = { ...buttonStyle, ...style };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  color: { backgroundColor: "dodgerblue" },
  shadow: {
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  buttonText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  white: { color: "white" },
});
