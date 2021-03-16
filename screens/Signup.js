import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import useAuth from "../hooks/auth";
import useApi from "../hooks/api";

import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { PhoneInput, PasswordInput, TextInput } from "../components/TextInput";
import { Button, BackButton } from "../components/Button";

import styles from "../styles";

export default Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const { api, loading, error } = useApi();
  const auth = useAuth();

  let submitSignup = async () => {
    const response = await api.users.register({ phone, password, name, lastName });
    if (!response.error) auth.logIn(response.headers["x-auth-token"]);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={wrapper}>
            <View>
              <BackButton onPress={() => navigation.goBack()} />
              <Text style={styles.title}>Регистрация</Text>
              <Text style={styles.subtitle}>Придумайте пароль, а также введите свои имя и фамилию.</Text>
              <PhoneInput style={input} state={[phone, setPhone]} />
              <PasswordInput style={input} state={[password, setPassword]} />
              <TextInput style={input} state={[name, setName]} placeholder="Имя" />
              <TextInput style={input} state={[lastName, setLastName]} placeholder="Фамилия" />
              <ErrorMessage error={error} />
            </View>
            <View>
              <Button style={button} title="Зарегистрироваться" onPress={submitSignup} />
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
