import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, PurchaseHistoryScreen } from "../screens";
import {  } from "../screens";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
    </Stack.Navigator>
  );
};
