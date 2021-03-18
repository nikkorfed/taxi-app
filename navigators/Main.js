import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Main from "../screens/Main";

export default AuthNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
  );
};
