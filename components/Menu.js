import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
  return <SimpleButton title="Выйти" style={[screen.item, screen.logout]} onPress={auth.logout} />;
};

const screen = StyleSheet.create({
  view: { justifyContent: "flex-start", height: "100%" },
  user: { flexDirection: "row", paddingVertical: 20, paddingHorizontal: 30 },
  userImage: { marginRight: 15, borderRadius: 20, height: 40, width: 40, backgroundColor: "whitesmoke" },
  userText: { ...styles.buttonText, color: "#333" },
  item: { alignItems: "flex-start", paddingVertical: 18, width: "100%", color: "#333" },
  logout: { marginTop: "auto", color: "dodgerblue" },
});
