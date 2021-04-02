import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";

import useAuth from "../hooks/auth";

import Main from "../screens/Main";
import Welcome from "../screens/Welcome";

import { SimpleButton } from "../components/Button";

import styles from "../styles";

export default () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{}} drawerContent={Menu}>
      <Drawer.Screen name="MainNavigator" component={MainNavigator}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main}></Stack.Screen>
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Menu = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={screen.view}>
        <View style={{ flexDirection: "row", paddingVertical: 20, paddingHorizontal: 30 }}>
          <View style={{ marginRight: 15, borderRadius: 20, height: 40, width: 40, backgroundColor: "whitesmoke" }} />
          <Text style={[styles.buttonText, screen.user]}>Корнилов Никита Федорович</Text>
        </View>
        <SimpleButton title="Поездки" style={[screen.item]} onPress={() => navigation.navigate("Welcome")} />
        <SimpleButton title="Предложения" style={[screen.item]} onPress={() => navigation.navigate("Welcome")} />
        <SimpleButton title="Настройки" style={[screen.item]} onPress={() => navigation.navigate("Welcome")} />
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
  user: { color: "#333" },
  item: { alignItems: "flex-start", paddingVertical: 18, width: "100%", color: "#333" },
  logout: { marginTop: "auto", color: "dodgerblue" },
});
