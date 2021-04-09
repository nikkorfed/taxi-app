import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import useMap from "../hooks/map";

import MapView from "../components/MapView";
import { Button } from "../components/Button";
import RouteSheet from "../components/RouteSheet";

import styles from "../styles";

export default Main = ({ navigation }) => {
  const { mapRef, zoomIn, zoomOut, toLocation, toCurrentLocation, from, to, options, route, sheets } = useMap();
  const center = useWindowDimensions().height / 2;

  return (
    <>
      <MapView mapRef={mapRef} route={route.value} />
      <View style={screen.bottom}>
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
      <TouchableOpacity style={[screen.zoomButton, { top: center - (40 + 15 / 2) }]} onPress={zoomIn} activeOpacity={0.8}>
        <FontAwesome5 name="plus" size={20} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={[screen.zoomButton, { top: center + 15 / 2 }]} onPress={zoomOut} activeOpacity={0.8}>
        <FontAwesome5 name="minus" size={20} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={screen.locationButton} onPress={toCurrentLocation} activeOpacity={0.8}>
        <FontAwesome name="location-arrow" size={20} color="#333" />
      </TouchableOpacity>
      <View style={screen.destination}>
        <TouchableOpacity style={screen.destinationInput} onPress={sheets.route.open} activeOpacity={0.8}>
          <Text style={screen.destinationText}>Куда поедем?</Text>
          <AntDesign name="arrowright" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <RouteSheet sheet={sheets.route} from={from} to={to} options={options} route={route} />
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
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: getStatusBarHeight() + 10,
    left: 15,
    borderRadius: 10,
    height: 40,
    width: 40,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  zoomButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    borderRadius: 10,
    height: 40,
    width: 40,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  locationButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 85,
    borderRadius: 10,
    height: 40,
    width: 40,
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
});
