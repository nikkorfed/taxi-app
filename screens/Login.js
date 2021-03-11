import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableWithoutFeedback } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import { Button, BackButton } from "../components/Button";

import styles from "../styles";

export default Welcome = ({ navigation }) => {
  const [phone, setPhone] = useState("+7");
  const editPhone = (text) => (text == "" || text == "+" ? setPhone("+7") : setPhone(text));

  useEffect(() => {
    phone.length == 18 ? input.current.getElement().blur() : null;
  }, [phone]);

  const input = useRef(null);
  const inputProps = {
    style: styles.input,
    type: "custom",
    options: { mask: "+7 999 999-99-99" },
    keyboardType: "number-pad",
    value: phone,
    onChangeText: editPhone,
    ref: input,
  };

  return (
    <SafeAreaView style={styles.body}>
      <TouchableWithoutFeedback onPress={() => input.current.getElement().blur()}>
        <View style={wrapper}>
          <BackButton onPress={() => navigation.goBack()} />
          <View>
            <Text style={styles.title}>Вход</Text>
            <Text style={styles.subtitle}>Введите свой номер телефона, чтобы авторизоваться и начать пользоваться приложением.</Text>
            <TextInputMask {...inputProps} />
          </View>
          <View>
            <Button style={{ marginBottom: 10 }} title="Войти" onPress={() => navigation.goBack()} />
            <Text style={styles.agreement}>Нажимая на эту кнопку, я на всё подписываюсь и соглашаюсь со всем, с чем только можно.</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const wrapper = { ...styles.wrapper, justifyContent: "space-between" };
