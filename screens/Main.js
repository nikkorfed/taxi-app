import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableHighlight } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import useAuth from "../hooks/auth";
import useMap from "../hooks/map";
import useBottom from "../hooks/bottom";

import MapView from "../components/MapView";
import { Button } from "../components/Button";
import Bottom from "../components/Bottom";

import styles from "../styles";

export default Main = ({ navigation }) => {
  const auth = useAuth();
  const { map, from, to, options, route, toLocation } = useMap();
  const bottom = useBottom();

  return (
    <>
      <MapView route={route} map={map} />
      <View style={screen.top}>
        <View style={screen.inputs}>
          <TextInput
            style={screen.inputFrom}
            placeholder="Откуда"
            value={from.value.full_name}
            onChangeText={from.set}
            onSubmitEditing={from.getOptions}
          />
          {Boolean(from.value.full_name) && (
            <TouchableHighlight style={screen.cross} onPress={from.reset} underlayColor="#eee" activeOpacity={0.9}>
              <AntDesign name="close" size={20} color="lightgrey" />
            </TouchableHighlight>
          )}
          <TextInput
            style={screen.input}
            placeholder="Куда"
            value={to.value.full_name}
            onChangeText={to.set}
            onSubmitEditing={to.getOptions}
          />
          {Boolean(to.value.full_name) && (
            <TouchableHighlight style={{ ...screen.cross, top: 45 }} onPress={to.reset} underlayColor="#eee" activeOpacity={0.9}>
              <AntDesign name="close" size={20} color="lightgrey" />
            </TouchableHighlight>
          )}
        </View>
        <View style={screen.options}>
          {options.value.map((option, i) => (
            <TouchableHighlight
              key={option.name}
              onPress={() => options.choose(option)}
              style={i == options.value.length - 1 ? screen.lastOption : screen.option}
              underlayColor="#eee"
              activeOpacity={0.9}
            >
              <Text>{option.full_name}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </View>
      <View style={screen.bottom}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          {<Button title="Выйти" onPress={auth.logout} />}
          {<Button title="Меню" onPress={navigation.openDrawer} />}
          {<Button title="Окно" onPress={bottom.open} />}
        </View>
        {Boolean(from.value.point) && Boolean(to.value.point) && !route.length && (
          <Button title="Поехали" onPress={drawRoute} color={true} shadow={true} style={{ marginTop: 10, width: "100%" }} />
        )}
        {Boolean(route.length) && (
          <>
            <Button title="Машрут" onPress={() => route.show()} color={true} shadow={true} style={{ marginBottom: 10, width: "100%" }} />
            <Button title="Старт" onPress={() => toLocation(route[0])} shadow={true} style={{ flex: 1, marginRight: 10 }} />
            <Button title="Финиш" onPress={() => toLocation(route[route.length - 1])} shadow={true} style={{ flex: 1 }} />
            <Button title="Проехать по маршруту" onPress={animateRoute} shadow={true} style={{ marginTop: 10, width: "100%" }} />
          </>
        )}
      </View>
      <Bottom {...bottom}>
        <Text style={styles.subtitle}>Всплывающее окошко снизу!</Text>
      </Bottom>
    </>
  );
};

const screen = StyleSheet.create({
  top: {
    position: "absolute",
    top: 30,
    left: 20,
    right: 20,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  inputs: {
    position: "absolute",
    zIndex: 2,
    marginBottom: 5,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    height: 45,
    width: "100%",
    fontSize: 16,
  },
  cross: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 45,
    width: 50,
  },
  options: {
    borderRadius: 10,
    paddingTop: 90,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  lastOption: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  tick: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 50,
  },
});
screen.inputFrom = { ...screen.input, borderBottomWidth: 1, borderBottomColor: "#eee" };
