import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import useAuth from "../hooks/auth";

import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { TextInput } from "../components/Inputs";
import { Button } from "../components/Button";

import styles from "../styles";

export default Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const { submitRegister, loading, error } = useAuth();

  useEffect(() => navigation.addListener("beforeRemove", (e) => e.preventDefault()), []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={wrapper}>
            <View>
              <View style={{ height: 70 }} />
              <Text style={styles.h1}>Регистрация</Text>
              <Text style={styles.subtitle}>Введите имя и фамилию для регистрации в приложении.</Text>
              <TextInput style={input} state={[name, setName]} placeholder="Имя" />
              <TextInput style={input} state={[lastName, setLastName]} placeholder="Фамилия" />
              <ErrorMessage error={error} />
            </View>
            <View>
              <Button style={button} title="Зарегистрироваться" onPress={() => submitRegister(name, lastName)} />
              <Text style={styles.agreement}>Нажимая на эту кнопку, я на всё подписываюсь и соглашаюсь со всем, с чем только можно.</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const wrapper = { ...styles.wrapper, justifyContent: "space-between" };
const input = { marginBottom: 10 };
const button = { marginBottom: 10 };
