import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";

import BottomSheet from "./BottomSheet";
import { TextInput } from "./Inputs";

export default ({ sheet, from, to, options, route }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    route.value.length && sheet.close();
  }, [route.value]);

  useEffect(() => {
    options.value.length ? setScroll(true) : setScroll(false);
  }, [options.value]);

  return (
    <BottomSheet {...sheet}>
      <View style={screen.inputs}>
        <TextInput state={from} style={screen.inputFrom} placeholder="Откуда" onSubmitEditing={() => options.get("from")} />
        <TextInput state={to} style={screen.inputTo} placeholder="Куда" onSubmitEditing={() => options.get("to")} />
      </View>
      <ScrollView style={screen.options} scrollEnabled={scroll}>
        {options.value.length > 0 &&
          options.value.map((option, index) => (
            <TouchableOpacity key={index} style={screen.option} onPress={() => options.choose(option)}>
              <Text style={screen.optionText}>{option.text}</Text>
              <Text style={screen.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </BottomSheet>
  );
};

const screen = StyleSheet.create({
  inputs: {
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputFrom: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputTo: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  options: {
    flex: 1,
    paddingHorizontal: 15,
  },
  option: {
    borderBottomWidth: 1,
    borderColor: "whitesmoke",
    paddingVertical: 10,
  },
  optionText: {
    marginTop: 5,
    fontFamily: "Rubik_500Medium",
  },
  optionDescription: {
    color: "#888",
  },
});
