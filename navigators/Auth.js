import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CodeEntry from "../screens/CodeEntry";
import Register from "../screens/Register";

export default AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CodeEntry" component={CodeEntry} />
      <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};
