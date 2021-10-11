import React from "react";
import Dashboard from '../screens/Dashboard';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Dashboard" component={Dashboard} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
