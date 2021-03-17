import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from "../screens/Main";

export default AuthNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name="Main" component={Main} />
    </Tab.Navigator>
  );
};
