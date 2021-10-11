import React from "react";
import Diretor from "../screens/Diretor";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DiretorStack = createNativeStackNavigator();

const DiretorRoutes = () => {
  return (
    <DiretorStack.Navigator>
      <DiretorStack.Screen name="Diretor" component={Diretor} />
    </DiretorStack.Navigator>
  );
};

export default DiretorRoutes;
