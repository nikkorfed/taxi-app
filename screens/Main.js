import fetch from "node-fetch";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableHighlight } from "react-native";

import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import MapView, { UrlTile, Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import useAuth from "../hooks/auth";

import { parseRoute } from "../utils/route";
import sleep from "../utils/sleep";

import { Button } from "../components/Button";

export default Main = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [from, setFrom] = useState({ full_name: "" });
  const [to, setTo] = useState({ full_name: "" });
  const [options, setOptions] = useState([]);
  const [route, setRoute] = useState([]);

  let auth = useAuth();
  let map = useRef(null);

  let toLocation = (target) => map.current.animateCamera({ center: target, zoom: 16 }, { duration: 300 });
  let toCurrentLocation = () => navigator.geolocation.getCurrentPosition(({ coords }) => toLocation(coords));

  let getOptions = async (input) => {
    input = input.nativeEvent.text;
    if (!input) return;
    input = encodeURIComponent(input);
    const response = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${input}&fields=items.point&key=ruslnb3529`);
    const data = await response.json();
    return data;
  };

  let getOptionsFrom = async (input) => {
    let data = await getOptions(input);
    let options = data.result.items;
    options.map((option, index) => (options[index].optionType = "from"));
    setOptions(options);
  };

  let getOptionsTo = async (input) => {
    let data = await getOptions(input);
    let options = data.result.items;
    options.map((option, index) => (options[index].optionType = "to"));
    setOptions(options);
  };

  let chooseOption = (option) => {
    if (option.optionType == "from") setFrom(option);
    else if (option.optionType == "to") setTo(option);
    setOptions([]);
  };

  let drawRoute = async () => {
    const body = {
      locale: "ru",
      points: [
        { type: "pedo", x: from.point.lon, y: from.point.lat },
        { type: "pedo", x: to.point.lon, y: to.point.lat },
      ],
      type: "jam",
    };
    const response = await fetch(`https://catalog.api.2gis.com/carrouting/6.0.0/global?key=ruslnb3529`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    let points = parseRoute(data);
    setOptions([]);
    setRoute(points);
    showRoute(points);
  };

  let showRoute = (points) => {
    map.current.fitToCoordinates(points ? points : route, { edgePadding: { top: 100, left: 20, right: 20, bottom: 0 }, animated: true });
  };

  let animateRoute = async () => {
    let step = 10000 / route.length;
    for (let point of route) {
      map.current.animateCamera({ center: point, zoom: 14 }, { duration: step });
      await sleep(step);
    }
  };

  let resetFrom = () => {
    setFrom("");
    setOptions([]);
    setRoute([]);
  };

  let resetTo = () => {
    setTo("");
    setOptions([]);
    setRoute([]);
  };

  useEffect(toCurrentLocation, []);

  return (
    <>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="none"
        showsUserLocation={true}
        onUserLocationChange={(e) => setUserLocation(e.nativeEvent.coordinate)}
        style={{ flex: 1, opacity: 0.8 }}
        ref={map}
      >
        <UrlTile urlTemplate="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&r=g&ts=online_hd" />
        {/* <UrlTile urlTemplate="http://vec04.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU" /> */}
        {Boolean(route.length) && <Polyline coordinates={route} strokeColor="dodgerblue" strokeWidth={5} style={{ zIndex: 3 }} />}
        {Boolean(route.length) && <Marker coordinate={route[route.length - 1]} />}
      </MapView>
      <View style={styles.top}>
        <View style={styles.inputs}>
          <TextInput
            style={{ ...styles.input, borderBottomWidth: 1, borderBottomColor: "#eee" }}
            placeholder="Откуда"
            value={from.full_name}
            onChangeText={(text) => setFrom({ text })}
            onSubmitEditing={getOptionsFrom}
          />
          {Boolean(from.full_name) && (
            <TouchableHighlight style={styles.cross} onPress={resetFrom} underlayColor="#eee" activeOpacity={0.9}>
              <AntDesign name="close" size={20} color="lightgrey" />
            </TouchableHighlight>
          )}
          <TextInput
            style={styles.input}
            placeholder="Куда"
            value={to.full_name}
            onChangeText={(text) => setTo({ text })}
            onSubmitEditing={getOptionsTo}
          />
          {Boolean(to.full_name) && (
            <TouchableHighlight style={{ ...styles.cross, top: 45 }} onPress={resetTo} underlayColor="#eee" activeOpacity={0.9}>
              <AntDesign name="close" size={20} color="lightgrey" />
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.options}>
          {options.map((option, i) => (
            <TouchableHighlight
              key={option.name}
              onPress={() => chooseOption(option)}
              style={i == options.length - 1 ? styles.lastOption : styles.option}
              underlayColor="#eee"
              activeOpacity={0.9}
            >
              <Text>{option.full_name}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </View>
      <View style={styles.bottom}>
        {<Button title="Выйти" onPress={auth.logout} />}
        {Boolean(from.point) && Boolean(to.point) && !route.length && (
          <Button title="Поехали" onPress={drawRoute} color={true} shadow={true} style={{ marginTop: 10, width: "100%" }} />
        )}
        {Boolean(route.length) && (
          <>
            <Button title="Машрут" onPress={() => showRoute()} color={true} shadow={true} style={{ marginBottom: 10, width: "100%" }} />
            <Button title="Старт" onPress={() => toLocation(route[0])} shadow={true} style={{ flex: 1, marginRight: 10 }} />
            <Button title="Финиш" onPress={() => toLocation(route[route.length - 1])} shadow={true} style={{ flex: 1 }} />
            <Button title="Проехать по маршруту" onPress={animateRoute} shadow={true} style={{ marginTop: 10, width: "100%" }} />
          </>
        )}
      </View>
    </>
  );
};

const styles = {
  body: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
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
};
