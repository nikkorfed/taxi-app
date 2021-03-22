import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import useAuth from "../hooks/auth";
import useMap from "../hooks/map";
import useBottom from "../hooks/bottom";

import MapView from "../components/MapView";
import { Button } from "../components/Button";
import Bottom from "../components/Bottom";
import { TextInput } from "../components/Inputs";

import styles from "../styles";

export default Main = ({ navigation }) => {
  const auth = useAuth();
  const { map, from, to, options, route, toLocation } = useMap();
  const bottom = useBottom();

  return (
    <>
      <MapView route={route} map={map} />
      <View style={screen.bottom}>
        {<Button title="Выйти" onPress={auth.logout} />}
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
      <TouchableOpacity style={screen.menuButton} onPress={navigation.openDrawer} activeOpacity={0.8}>
        <MaterialIcons name="menu" size={20} color="#333" />
      </TouchableOpacity>
      <View style={screen.destination}>
        <TouchableOpacity style={screen.destinationInput} onPress={bottom.open} activeOpacity={0.8}>
          <Text style={screen.destinationText}>Куда поедем?</Text>
          <AntDesign name="arrowright" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <Bottom {...bottom}>
        <View style={styles.wrapper}>
          <View style={screen.inputs}>
            <TextInput
              state={[from.value.text, from.set]}
              style={{ borderBottomWidth: 1, borderBottomColor: "#eee", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              placeholder="Откуда"
            />
            <TextInput state={[to.value.text, to.set]} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} placeholder="Куда" />
            <View style={{ justifyContent: "center", alignItems: "center", height: 400 }}>
              <Text style={styles.subtitle}>Здесь будет история предыдущих поисков или поездок...</Text>
            </View>
          </View>
        </View>
      </Bottom>
    </>
  );
};

const screen = StyleSheet.create({
  bottom: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 80,
  },
  menuButton: {
    position: "absolute",
    top: getStatusBarHeight() + 10,
    left: 15,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  destination: {
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  destinationInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  },
  destinationText: {
    fontFamily: "Rubik_500Medium",
    fontSize: 15,
    color: "#333",
  },
  inputs: {
    borderRadius: 10,
  },
});
screen.inputFrom = { ...screen.input, borderBottomWidth: 1, borderBottomColor: "#eee" };
