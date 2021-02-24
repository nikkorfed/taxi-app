import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { showLocation } from "react-native-map-link";

export default Welcome = ({ navigation }) => {
  let coords = { latitude: 38.8976763, longitude: -77.0387185 };
  // Alert.alert("Где открыть?", "Выберите приложенние, в котором вы хотите посмотреть указанную локацию.", [
  //   { text: "Яндекс Go", onPress: () => showLocation({ ...coords, app: "yandex-taxi" }) },
  //   { text: "Яндекс Карты", onPress: () => showLocation({ ...coords, app: "yandex-maps" }) },
  //   { text: "Apple Карты", onPress: () => showLocation({ ...coords, app: "apple-maps" }) },
  // ]);
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.wrapper}>
        <View style={styles.icon}>
          <FontAwesome5 name="taxi" size={40} color="dodgerblue" />
        </View>
        <Text style={styles.title}>Такси</Text>
        <Text style={styles.subtitle}>Добро пожаловать в наше приложение! Чтобы заказать такси, нажмите на кнопку.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Заказать такси</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    opacity: 0.9,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    paddingHorizontal: 20,
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 30,
    // shadowOpacity: 0.3,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 10,
    height: 100,
    width: 100,
    backgroundColor: "#f8f8f8",
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Rubik_700Bold",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
    fontSize: 20,
    lineHeight: 30,
    color: "#888",
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
