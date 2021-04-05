import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { Button, SimpleButton } from "../components/Button";
import styles from "../styles";

export default Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.body}>
      <View style={wrapper}>
        <View style={icon}>
          <FontAwesome5 name="taxi" size={40} color="dodgerblue" />
        </View>
        <Text style={styles.h1}>Такси</Text>
        <Text style={subtitle}>Добро пожаловать! Войдите, чтобы начать пользоваться приложением.</Text>
        <View style={styles.bottomButtons}>
          <Button style={loginButton} title="Войти" onPress={() => navigation.navigate("Login")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const wrapper = { ...styles.wrapper, justifyContent: "center", alignItems: "center" };
const subtitle = { ...styles.subtitle, textAlign: "center" };
const icon = {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 30,
  borderRadius: 10,
  height: 100,
  width: 100,
  backgroundColor: "#f5f5f5",
};
const loginButton = { marginBottom: 5 };
const signupButton = { marginBottom: -10 };
