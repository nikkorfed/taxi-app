import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import useFonts from "./hooks/fonts";

import AuthContext from "./auth/context";
import authStorage from "./auth/storage";

import Main from "./screens/Main";
import Auth from "./navigators/Auth";

export default App = () => {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState();
  const [user, setUser] = useState();

  const fontsLoaded = useFonts();

  let restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!fontsLoaded || !isReady) return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.warn} />;

  return (
    <AuthContext.Provider value={{ data, setData, user, setUser }}>
      <NavigationContainer>{user ? <Main /> : <Auth />}</NavigationContainer>
    </AuthContext.Provider>
  );
};
