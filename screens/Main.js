import fetch from "node-fetch";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback, TouchableHighlight } from "react-native";

import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import { parseRoute } from "../utils/route";

import Button from "../components/Button";

export default Main = () => {
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [inputTo, setInputTo] = useState("");
  const [options, setOptions] = useState([]);
  const [target, setTarget] = useState({});
  const [route, setRoute] = useState([]);

  let map = useRef(null);

  let toLocation = (target) => map.current.animateCamera({ center: target, zoom: 16 }, { duration: 300 });
  let toCurrentLocation = () => navigator.geolocation.getCurrentPosition(({ coords }) => toLocation(coords));

  let getOptions = async (input) => {
    if (input.nativeEvent) input = input.nativeEvent.text;
    if (!input) return;
    input = encodeURIComponent(input);
    const response = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${input}&fields=items.point&key=ruslnb3529`);
    const data = await response.json();
    setOptions(data.result.items);
  };

  let drawRoute = async () => {
    const destination = target.point;
    const body = {
      locale: "ru",
      points: [
        { type: "pedo", x: userLocation.longitude, y: userLocation.latitude },
        { type: "pedo", x: destination.lon, y: destination.lat },
      ],
      type: "jam",
    };
    const response = await fetch(`https://catalog.api.2gis.com/carrouting/6.0.0/global?key=ruslnb3529`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    let points = parseRoute(data);
    setInputTo(target.full_name);
    setOptions([]);
    setRoute(points);
    showRoute(points);
  };

  let showRoute = (points) => {
    map.current.fitToCoordinates(points ? points : route, { edgePadding: { top: 100, left: 20, right: 20, bottom: 0 }, animated: true });
  };

  let reset = () => {
    setInputTo("");
    setOptions([]);
    setTarget({});
    setRoute([]);
  };

  useEffect(toCurrentLocation, []);

  return (
    <>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={(e) => setUserLocation(e.nativeEvent.coordinate)}
        style={{ flex: 1 }}
        ref={map}
      >
        {Boolean(route.length) && <Polyline coordinates={route} strokeColor="dodgerblue" strokeWidth={5} />}
        {Boolean(route.length) && <Marker coordinate={route[route.length - 1]} />}
      </MapView>
      <View style={styles.top}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.inputTo}
            placeholder="Куда поедем?"
            value={inputTo}
            onChangeText={setInputTo}
            onSubmitEditing={getOptions}
          />
          {Boolean(inputTo) && (
            <TouchableHighlight style={styles.cross} onPress={reset} underlayColor="#eee" activeOpacity={0.9}>
              <AntDesign name="close" size={20} color="lightgrey" />
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.options}>
          {options.map((item, i) => (
            <TouchableHighlight
              key={item.name}
              onPress={() => setTarget(item)}
              style={i == options.length - 1 ? styles.lastOption : styles.option}
              underlayColor="#eee"
              activeOpacity={0.9}
            >
              <>
                <Text>{item.full_name}</Text>
                {item == target && (
                  <View style={styles.tick}>
                    <AntDesign name="check" size={20} color="dodgerblue" />
                  </View>
                )}
              </>
            </TouchableHighlight>
          ))}
        </View>
      </View>
      <View style={styles.bottom}>
        {Boolean(route.length) && (
          <>
            <Button title="Машрут" onPress={() => showRoute()} color={true} shadow={true} style={{ marginBottom: 10, width: "100%" }} />
            <Button title="Старт" onPress={toCurrentLocation} shadow={true} style={{ flex: 1, marginRight: 10 }} />
            <Button title="Финиш" onPress={() => toLocation(route[route.length - 1])} shadow={true} style={{ flex: 1 }} />
          </>
        )}
        {Boolean(Object.keys(target).length) && !route.length && (
          <Button title="Поехали" onPress={drawRoute} color={true} shadow={true} style={{ marginTop: 10, width: "100%" }} />
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
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  inputTo: {
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
    bottom: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 50,
  },
  options: {
    borderRadius: 10,
    paddingTop: 45,
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
