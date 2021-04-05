import React from "react";
import { TextInput as Input, Keyboard } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import styles from "../styles";

let getState = (state) => {
  let value, set;

  if (Array.isArray(state)) [value, set] = state;
  else ({ value, set } = state);

  return [value, set];
};

export let TextInput = ({ style, state, ...props }) => {
  let [value, set] = getState(state);

  props.style = [styles.input, style];

  return <Input value={value} onChangeText={set} {...props} />;
};

export let PhoneInput = ({ style, state, ...props }) => {
  let [value, set] = getState(state);

  props.style = [styles.input, style];
  props.type = "custom";
  props.options = { mask: "+7 999 999-99-99" };
  props.keyboardType = "number-pad";
  props.placeholder = "Телефон";

  let editPhone = (text) => {
    text == "" || text == "+" ? set("+7") : set(text);
    text.length == 16 ? Keyboard.dismiss() : null;
  };

  props.onFocus = () => phone == "" && editPhone("");

  return <TextInputMask value={value} onChangeText={editPhone} {...props} />;
};

export let PasswordInput = ({ style, state, ...props }) => {
  let [value, set] = getState(state);

  props.style = [styles.input, style];
  props.secureTextEntry = true;
  props.placeholder = "Пароль";

  return <Input value={value} onChangeText={set} {...props} />;
};

export let CodeInput = ({ style, state, ...props }) => {
  let [value, set] = getState(state);

  props.style = [styles.input, style];
  props.keyboardType = "number-pad";
  props.placeholder = "Одноразовый код";

  let editCode = (text) => {
    set(text);
    text.length == 6 ? Keyboard.dismiss() : null;
  };

  return <Input value={value} onChangeText={editCode} {...props} />;
};
