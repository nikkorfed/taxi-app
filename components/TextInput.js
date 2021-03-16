import React from "react";
import { TextInput as Input, Keyboard } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import styles from "../styles";

export let TextInput = ({ style, state: [value, set], ...props }) => {
  props.style = { ...styles.input, ...style };

  return <Input value={value} onChangeText={set} {...props} />;
};

export let PhoneInput = ({ style, state: [value, set], ...props }) => {
  props.style = { ...styles.input, ...style };
  props.type = "custom";
  props.options = { mask: "+7 999 999-99-99" };
  props.keyboardType = "number-pad";
  props.placeholder = "Телефон";

  let editPhone = (text) => {
    text == "" || text == "+" ? set("+7") : set(text);
    text.length == 16 ? Keyboard.dismiss() : null;
  };

  props.onFocus = () => {
    value == "" && editPhone("");
  };
  props.onChangeText = editPhone;

  return <TextInputMask value={value} onChangeText={set} {...props} />;
};

export let PasswordInput = ({ style, state: [value, set], ...props }) => {
  props.style = { ...styles.input, ...style };
  props.secureTextEntry = true;
  props.placeholder = "Пароль";

  return <Input value={value} onChangeText={set} {...props} />;
};
