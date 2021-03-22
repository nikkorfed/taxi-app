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
          <View style={screen.barArea}>
            <View style={screen.bar} />
          </View>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 20,
    shadowOpacity: 0.15,
  },
  barArea: {
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: "100%",
  },
  bar: {
    borderRadius: 5,
    height: 4,
    width: 30,
    backgroundColor: "lightgrey",
  },
});
