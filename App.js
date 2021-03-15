import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import jwtDecode from "jwt-decode";

import useFonts from "./hooks/fonts";

import AuthContext from "./auth/context";
import authStorage from "./auth/storage";

import Main from "./screens/Main";
import Welcome from "./navigators/Welcome";

export default App = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();

  const fontsLoaded = useFonts();

  const getUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!fontsLoaded || !isReady) return <AppLoading startAsync={getUser} onFinish={() => setIsReady(true)} onError={console.warn} />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{user ? <Main /> : <Welcome />}</NavigationContainer>
    </AuthContext.Provider>
  );
};
