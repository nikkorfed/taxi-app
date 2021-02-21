import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";

import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from "@expo-google-fonts/rubik";

import Welcome from "./screens/Welcome";
import Main from "./screens/Main";

export default App = () => {
  let [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_500Medium, Rubik_700Bold });
  if (!fontsLoaded) return <AppLoading />;

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
