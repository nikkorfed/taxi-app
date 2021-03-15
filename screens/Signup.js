import React, { useState, useEffect, useContext, useRef } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import useAuth from "../hooks/auth";
import useApi from "../hooks/api";

import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { Button, BackButton } from "../components/Button";

import styles from "../styles";

export default Login = ({ navigation }) => {
  const [phone, setPhone] = useState("+7");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const { api, loading, error } = useApi();
  const auth = useAuth();

  const loginInput = useRef(null);
  const passwordInput = useRef(null);
  const nameInput = useRef(null);
  const lastNameInput = useRef(null);

  const loginProps = { type: "custom", options: { mask: "+7 999 999-99-99" }, keyboardType: "number-pad", ref: loginInput };
  const passwordProps = { secureTextEntry: true, placeholder: "Пароль", ref: passwordInput };
  const nameProps = { placeholder: "Имя", ref: nameInput };
  const lastNameProps = { placeholder: "Фамилия", ref: lastNameInput };

  let editPhone = (text) => {
    text == "" || text == "+" ? setPhone("+7") : setPhone(text);
    text.length == 16 ? blur() : null;
  };

  let blur = () => {
    loginInput.current.getElement().blur();
    passwordInput.current.blur();
    nameInput.current.blur();
    lastNameInput.current.blur();
  };

  let submitSignup = async () => {
    const response = await api.users.auth({ phone, password });
    if (!response.error) auth.logIn(response.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.body}>
        <TouchableWithoutFeedback onPress={blur}>
          <View style={wrapper}>
            <View>
              <BackButton onPress={() => navigation.goBack()} />
              <Text style={styles.title}>Регистрация</Text>
              <Text style={styles.subtitle}>Введите имя и фамилию, а также придумайте пароль.</Text>
              <TextInputMask style={input} value={phone} onChangeText={editPhone} {...loginProps} />
              <TextInput style={input} value={password} onChangeText={setPassword} {...passwordProps} />
              <TextInput style={input} value={name} onChangeText={setName} {...nameProps} />
              <TextInput style={input} value={lastName} onChangeText={setLastName} {...lastNameProps} />
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
const input = { ...styles.input, marginBottom: 10 };
const button = { marginBottom: 10 };
