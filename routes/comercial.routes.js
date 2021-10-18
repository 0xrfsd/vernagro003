import React from "react";
import Axios from "axios";

import Comercial from "../screens/Comercial";
import Pedidos from "../screens/Comercial/pedidos";
import Produtos from "../screens/Comercial/produtos";
import AddFilial from "../screens/Comercial/addFilial";
import Explorar from "../screens/Comercial/explorar";

import Especificacoes from "../screens/Comercial/especificacoes";
import Informacoes from "../screens/Comercial/informacoes";
import Valores from "../screens/Comercial/valores";
import Disponibilidade from "../screens/Comercial/disponibilidade";

import ConsultarProdutos from "../screens/Comercial/consultarProdutos";
import Produto from "../screens/Comercial/produto";

import { View, Text, Alert, Pressable, TouchableOpacity } from "react-native";

import { useSnapshot } from "valtio";

import { addFilialState } from "../screens/Comercial/addFilial";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const ComercialTab = createBottomTabNavigator();
const ComercialStack = createNativeStackNavigator();

const ComercialRoutes = () => {
  const state = useSnapshot(addFilialState);
  const [error, setError] = React.useState("");
  const navigation = useNavigation();

  if (error) {
    Alert.alert("Erro", error);
    setError("");
  }

  const handleFilial = async () => {
    const response = await Axios.post(
      "http://192.168.0.110:9903/api/v0/core/filial",
      {
        empresaId: state.empresaId,
        nome: state.nome,
        estado: state.estado,
      }
    );
    if (response.data.status === "Erro!") {
      setError(response.data.error);
    }
    if (response.data === "Filial registrada com sucesso!") {
      Alert.alert("Registrada", response.data);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
  };

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
          component={Produto}
        />
        <ComercialStack.Screen
          name="ConsultarProdutos"
          component={ConsultarProdutos}
          options={{ headerShown: false }}
        />
        <ComercialStack.Screen
          name="Explorar"
          component={Explorar}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <View style={{ paddingHorizontal: 0 }}>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{
                    height: "auto",
                    width: "auto",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "green" }}>Fechar</Text>
                </Pressable>
              </View>
            ),
          })}
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
