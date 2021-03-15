import React, { useState, useEffect, useContext, useRef } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import useAuth from "../hooks/auth";
import useApi from "../hooks/api";

import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { Button, BackButton } from "../components/Button";

import styles from "../styles";

export default Welcome = ({ navigation }) => {
  const [phone, setPhone] = useState("+7");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const { api, loading, error } = useApi();

  const loginInput = useRef(null);
  const passwordInput = useRef(null);

  const loginProps = { type: "custom", options: { mask: "+7 999 999-99-99" }, keyboardType: "number-pad", ref: loginInput };
  const passwordProps = { secureTextEntry: true, placeholder: "Пароль", ref: passwordInput };

  let editPhone = (text) => {
    text == "" || text == "+" ? setPhone("+7") : setPhone(text);
    text.length == 16 ? blur() : null;
  };

  let blur = () => {
    loginInput.current.getElement().blur();
    passwordInput.current.blur();
  };

  let submitLogin = async () => {
    const response = await api.users.auth({ phone: phone.replace(/ |-/g, ""), password });
    if (!response.error) auth.logIn(response.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.body}>
        <TouchableWithoutFeedback onPress={blur}>
          <View style={wrapper}>
            <BackButton onPress={() => navigation.goBack()} />
            <View style={{ marginTop: -120 }}>
              <Text style={styles.title}>Вход</Text>
              <Text style={styles.subtitle}>Введите свой телефон и пароль, чтобы авторизоваться и начать пользоваться приложением.</Text>
              <TextInputMask style={input} value={phone} onChangeText={editPhone} {...loginProps} />
              <TextInput style={input} value={password} onChangeText={setPassword} {...passwordProps} />
              <ErrorMessage error={error} />
            </View>
            <View>
              <Button style={button} title="Войти" onPress={submitLogin} />
              <Text style={styles.agreement}>Нажимая на эту кнопку, я на всё подписываюсь и соглашаюсь со всем, с чем только можно.</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const wrapper = { ...styles.wrapper, justifyContent: "space-between" };
const input = { ...styles.input, marginBottom: 10 };
const button = { marginBottom: 10 };
