import React from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";

export default Main = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.body}>
        <View style={styles.wrapper}>
          <Text>Здесь будет карта. Ага!</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    bottom: 20,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: "100%",
    backgroundColor: "dodgerblue",
  },
  buttonText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
