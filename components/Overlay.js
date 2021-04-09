import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default ({ navigation, map: { zoomIn, zoomOut, toCurrentLocation, sheets } }) => {
  const center = useWindowDimensions().height / 2;
  const insets = useSafeAreaInsets();

  return (
    <>
      <TouchableOpacity style={[screen.menuButton, { top: insets.top + 10 }]} onPress={navigation.openDrawer} activeOpacity={0.8}>
        <MaterialIcons name="menu" size={20} color="#333" />
      </TouchableOpacity>
      <View style={[screen.zoomButtons, { top: center - 40 }]}>
        <TouchableOpacity style={screen.zoomInButton} onPress={zoomIn} activeOpacity={0.8}>
          <Entypo name="plus" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={screen.zoomOutButton} onPress={zoomOut} activeOpacity={0.8}>
          <Entypo name="minus" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[screen.locationButton, { top: center + 40 + 15 }]} onPress={toCurrentLocation} activeOpacity={0.8}>
        <FontAwesome name="location-arrow" size={18} color="#333" />
      </TouchableOpacity>
      <View style={[screen.destination, { paddingBottom: insets.bottom > 0 ? insets.bottom : screen.destination.padding }]}>
        <TouchableOpacity style={screen.destinationInput} onPress={sheets.route.open} activeOpacity={0.8}>
          <Text style={screen.destinationText}>Куда поедем?</Text>
          <AntDesign name="arrowright" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const screen = StyleSheet.create({
  menuButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 15,
    borderRadius: 10,
    height: 40,
    width: 40,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  zoomButtons: {
    position: "absolute",
    right: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  zoomInButton: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
  zoomOutButton: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
  locationButton: {
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
