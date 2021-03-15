import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import styles from "../styles";

export default ({ visible }) => {
  const source = require("../assets/animations/loader.json");
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView style={styles.activityIndicator} source={source} autoPlay loop />
    </View>
  );
};
