import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import useAuth from "../hooks/auth";
import useApi from "../hooks/api";

import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { CodeInput } from "../components/Inputs";
import { Button, BackButton } from "../components/Button";

import styles from "../styles";

export default Login = ({ navigation }) => {
  const [code, setCode] = useState("");

  const { api, loading, error } = useApi();
  const auth = useAuth();

  let submitCode = async () => {
    const response = await api.users.authConfirm({ phone: auth.data.phone, code });
    if (response.error) return;
    if (response.data.register) auth.setData({ ...auth.data, token: response.data.token }) && navigation.navigate("Register");
    else auth.logIn(response.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={wrapper}>
            <View>
              <BackButton onPress={() => navigation.goBack()} />
              <Text style={styles.title}>Введите код</Text>
              <Text style={styles.subtitle}>Чтобы продолжить, введите одноразовый 6-значный код, отправленный на ваш телефон.</Text>
              <CodeInput style={input} state={[code, setCode]} />
              <ErrorMessage error={error} />
            </View>
            <View>
              <Button style={button} title="Далее" onPress={submitCode} />
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
