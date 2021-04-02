import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";

import Main from "../screens/Main";
import Welcome from "../screens/Welcome";

import Menu from "../components/Menu";

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
