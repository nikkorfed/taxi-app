import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";

import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from "@expo-google-fonts/rubik";

import Main from "./screens/Main";
import Welcome from "./navigators/Welcome";

export default App = () => {
  let [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_500Medium, Rubik_700Bold });
  if (!fontsLoaded) return <AppLoading />;

  let initialNavigationState = { index: 1, routes: [{ name: "Main" }, { name: "Welcome" }] };
  const Stack = createStackNavigator();

  return (
    <NavigationContainer initialState={initialNavigationState}>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: "transparent" } }} mode="modal">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
