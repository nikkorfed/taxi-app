import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Animated from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import styles from "../styles";

export default Bottom = ({ view, overlay, gestureHandler, children }) => {
  return (
    <>
      <Animated.View style={[screen.overlay, overlay]} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[screen.view, view]}>
          <View style={screen.bar} />
          {children}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const screen = StyleSheet.create({
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "black" },
  view: {
    position: "absolute",
    top: "100%",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 20,
    shadowOpacity: 0.15,
  },
  bar: {
    position: "absolute",
    top: 10,
    borderRadius: 5,
    height: 5,
    width: 40,
    backgroundColor: "lightgrey",
  },
});
