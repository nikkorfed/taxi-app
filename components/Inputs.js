import React from "react";
import { TextInput as Input, Keyboard } from "react-native";

import { TextInputMask } from "react-native-masked-text";

import styles from "../styles";

export let TextInput = ({ style, state, ...props }) => {
  let value, set;

  if (Array.isArray(state)) [value, set] = state;
  else ({ value, set } = state);

  props.style = [styles.input, style];

  return <Input value={value} onChangeText={set} {...props} />;
};

export let PhoneInput = ({ style, state: [phone, setPhone], ...props }) => {
  props.style = [styles.input, style];
  props.type = "custom";
  props.options = { mask: "+7 999 999-99-99" };
  props.keyboardType = "number-pad";
  props.placeholder = "Телефон";

  let editPhone = (text) => {
    text == "" || text == "+" ? setPhone("+7") : setPhone(text);
    text.length == 16 ? Keyboard.dismiss() : null;
  };

  props.onFocus = () => phone == "" && editPhone("");
  props.onChangeText = editPhone;

  return <TextInputMask value={phone} onChangeText={setPhone} {...props} />;
};

export let PasswordInput = ({ style, state: [password, setPassword], ...props }) => {
  props.style = [styles.input, style];
  props.secureTextEntry = true;
  props.placeholder = "Пароль";

  return <Input value={password} onChangeText={setPassword} {...props} />;
};

export let CodeInput = ({ style, state: [code, setCode], ...props }) => {
  props.style = [styles.input, style];
  props.keyboardType = "number-pad";
  props.placeholder = "Одноразовый код";

  let editCode = (text) => {
    setCode(text);
    text.length == 6 ? Keyboard.dismiss() : null;
  };

  props.onChangeText = editCode;

  return <Input value={code} onChangeText={setCode} {...props} />;
};
