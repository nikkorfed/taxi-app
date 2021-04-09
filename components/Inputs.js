import React from "react";
import { View, TextInput as Input, TouchableOpacity, Keyboard } from "react-native";

import { TextInputMask } from "react-native-masked-text";
import { AntDesign } from "@expo/vector-icons";

import styles from "../styles";

let getState = (state) => {
  let value, set, reset;

  if (Array.isArray(state)) [value, set, reset] = state;
  else ({ value, set, reset } = state);

  let resetable = Boolean(value && reset);

  return { value, set, reset, resetable };
};

export let TextInput = ({ style, state, ...props }) => {
  let { value, set, reset, resetable } = getState(state);

  props.style = [styles.input, style];

  return (
    <View>
      <Input value={value} onChangeText={set} {...props} />
      {resetable && (
        <TouchableOpacity style={styles.inputReset} onPress={reset}>
          <AntDesign name="close" size={20} color="#ccc" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export let PhoneInput = ({ style, state, ...props }) => {
  let { value, set, reset, resetable } = getState(state);

  props.style = [styles.input, style];
  props.type = "custom";
  props.options = { mask: "+7 999 999-99-99" };
  props.keyboardType = "number-pad";
  props.placeholder = "Телефон";

  let edit = (text) => {
    text == "" || text == "+" ? set("+7") : set(text);
    text.length == 16 ? Keyboard.dismiss() : null;
  };

  props.onFocus = () => value == "" && edit("");

  return (
    <View>
      <TextInputMask value={value} onChangeText={edit} {...props} />
      {resetable && (
        <TouchableOpacity style={styles.inputReset} onPress={reset}>
          <AntDesign name="close" size={20} color="#ccc" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export let PasswordInput = ({ style, state, ...props }) => {
  let { value, set } = getState(state);

  props.style = [styles.input, style];
  props.secureTextEntry = true;
  props.placeholder = "Пароль";

  return <Input value={value} onChangeText={set} {...props} />;
};

export let CodeInput = ({ style, state, ...props }) => {
  let { value, set } = getState(state);

  props.style = [styles.input, style];
  props.keyboardType = "number-pad";
  props.placeholder = "Одноразовый код";

  let edit = (text) => {
    set(text);
    text.length == 6 ? Keyboard.dismiss() : null;
  };

  return <Input value={value} onChangeText={edit} {...props} />;
};
