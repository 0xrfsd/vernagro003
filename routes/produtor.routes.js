import React from "react";
import Produtor from "../screens/Produtor";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProdutorStack = createNativeStackNavigator();

const ProdutorRoutes = () => {
  return (
    <ProdutorStack.Navigator>
      <ProdutorStack.Screen name="Produtor" component={Produtor} />
    </ProdutorStack.Navigator>
  );
};

export default ProdutorRoutes;
