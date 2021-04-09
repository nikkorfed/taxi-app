import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import useAuth from "../hooks/auth";

import { SimpleButton } from "../components/Button";

import styles from "../styles";

export default Menu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={screen.view}>
        <View style={screen.user}>
          <View style={screen.userImage} />
          <Text style={screen.userText}>Корнилов Никита Федорович</Text>
        </View>
        <SimpleButton title="Поездки" style={screen.item} onPress={() => navigation.navigate("Welcome")} />
        <SimpleButton title="Предложения" style={screen.item} onPress={() => navigation.navigate("Welcome")} />
        <SimpleButton title="Настройки" style={screen.item} onPress={() => navigation.navigate("Welcome")} />
        <LogoutButton navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const LogoutButton = ({ navigation }) => {
  const auth = useAuth(navigation);
  return (
    <TouchableOpacity onPress={auth.logout} style={[styles.button, styles.simpleButton, screen.item, screen.logout]} activeOpacity={0.8}>
      <MaterialIcons name="logout" style={screen.logoutIcon} size={20} color="dodgerblue" />
      <SimpleButton title="Выйти" style={screen.logoutText} onPress={auth.logout} />
    </TouchableOpacity>
  );
};

const screen = StyleSheet.create({
  view: { justifyContent: "flex-start", height: "100%" },
  user: { flexDirection: "row", paddingVertical: 20, paddingHorizontal: 30 },
  userImage: { marginRight: 15, borderRadius: 20, height: 40, width: 40, backgroundColor: "whitesmoke" },
  userText: { ...styles.buttonText, color: "#333" },
  item: { alignItems: "flex-start", paddingVertical: 18, width: "100%", color: "#333" },
  logout: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: "auto" },
  logoutIcon: { marginRight: 15 },
  logoutText: { paddingVertical: 0, paddingHorizontal: 0, color: "dodgerblue" },
});
