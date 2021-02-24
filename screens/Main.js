import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { StatusBar } from "expo-status-bar";

export default Main = ({ navigation }) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0.015, longitudeDelta: 0.015 });
  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition((position) =>
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        })
      ),
    []
  );

  return (
    <>
      <StatusBar style="auto" />
      <MapView provider={PROVIDER_GOOGLE} region={position} showsUserLocation={true} style={{ flex: 1 }} />
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
