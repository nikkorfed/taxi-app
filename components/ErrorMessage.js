import React from "react";
import { Text } from "react-native";

import styles from "../styles";

export default ({ error }) => {
  if (!error) return null;
  return <Text style={styles.error}>{error}</Text>;
};
