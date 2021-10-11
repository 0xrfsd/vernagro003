import React from "react";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import Auth from '../screens/Auth/auth';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
