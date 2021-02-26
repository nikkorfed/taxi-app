import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import Button from "../components/Button";

export default Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.wrapper}>
        <View style={styles.icon}>
          <FontAwesome5 name="taxi" size={40} color="dodgerblue" />
        </View>
        <Text style={styles.title}>Такси</Text>
        <Text style={styles.subtitle}>Добро пожаловать! Чтобы заказать такси, введите адрес назначения и нажмите на кнопку.</Text>
        <View style={styles.buttons}>
          <Button title="Заказать такси" onPress={() => navigation.goBack()} color={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    // opacity: 0.95,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
  buttons: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});
