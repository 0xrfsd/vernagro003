import React from "react";
import Axios from "axios";

import Comercial from "../screens/Comercial";

import Explorar from "../screens/Comercial/explorar";
import Parametros from "../screens/Comercial/parametros";

import Especificacoes from "../screens/Comercial/especificacoes";
import Informacoes from "../screens/Comercial/informacoes";
import Valores from "../screens/Comercial/valores";
import Disponibilidade from "../screens/Comercial/disponibilidade";

import ConsultarPedidos from "../screens/Comercial/consultarPedidos";
import ConsultarProdutos from "../screens/Comercial/consultarProdutos";
import ConsultarFiliais from "../screens/Comercial/consultarFiliais";
import ConsultarAgronomos from "../screens/Comercial/consultarAgronomos";

import AddAgronomo from "../screens/Comercial/addAgronomo";
import AddProduto from "../screens/Comercial/AddProduto";
import AddFilial from "../screens/Comercial/addFilial";

import { View, Text, Alert, Pressable, TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/core";

const ComercialStack = createNativeStackNavigator();

const ComercialRoutes = () => {
  const [error, setError] = React.useState("");
  const navigation = useNavigation();

  if (error) {
    Alert.alert("Erro", error);
    setError("");
  }

  return (
    <ComercialStack.Navigator>
      <ComercialStack.Screen
        name="Home"
        component={Comercial}
        options={{ headerShown: false }}
      />
      <ComercialStack.Group screenOptions={{ presentation: "modal" }}>
        <ComercialStack.Screen
          name="AddProduto"
          options={{ headerShown: false }}
          component={AddProduto}
        />
        <ComercialStack.Screen
          name="AddFilial"
          options={{ headerShown: false }}
          component={AddFilial}
        />
        <ComercialStack.Screen
          name="AddAgronomo"
          options={{ headerShown: false }}
          component={AddAgronomo}
        />
        <ComercialStack.Screen
          name="ConsultarPedidos"
          component={ConsultarPedidos}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="ConsultarProdutos"
          component={ConsultarProdutos}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="ConsultarAgronomos"
          component={ConsultarAgronomos}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="ConsultarFiliais"
          component={ConsultarFiliais}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Parametros"
          component={Parametros}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Explorar"
          component={Explorar}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Informacoes"
          component={Informacoes}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Disponibilidade"
          component={Disponibilidade}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Valores"
          component={Valores}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Especificacoes"
          component={Especificacoes}
          options={{ headerShown: false }}
        />
      </ComercialStack.Group>
    </ComercialStack.Navigator>
  );
};

export default ComercialRoutes;
