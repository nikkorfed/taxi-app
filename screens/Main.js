import React from "react";
import { StyleSheet, View } from "react-native";

import MapContext from "../contexts/map";

import useMap from "../hooks/map";

import MapView from "../components/MapView";
import { Button } from "../components/Button";
import Overlay from "../components/Overlay";
import RouteSheet from "../components/RouteSheet";

import styles from "../styles";

export default Main = ({ navigation }) => {
  const map = useMap();
  const { mapRef, zoomIn, zoomOut, toLocation, toCurrentLocation, from, to, options, route, sheets } = map;

  return (
    <MapContext.Provider value={map}>
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
      <Overlay navigation={navigation} />
      <RouteSheet sheet={sheets.route} />
    </MapContext.Provider>
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
});
