import React from "react";
import Consultor from "../screens/Consultor";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ConsultorStack = createNativeStackNavigator();

const ConsultorRoutes = () => {
  return (
    <ConsultorStack.Navigator>
      <ConsultorStack.Screen name="Consultor" component={Consultor} />
    </ConsultorStack.Navigator>
  );
};

export default ConsultorRoutes;
