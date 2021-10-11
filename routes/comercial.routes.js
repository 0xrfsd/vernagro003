import React from "react";
import Axios from "axios";

import Comercial from "../screens/Comercial";
import Pedidos from "../screens/Comercial/pedidos";
import Produtos from "../screens/Comercial/produtos";
import AddFilial from "../screens/Comercial/addFilial";
import Explorar from "../screens/Comercial/explorar";

import Especificacoes from '../screens/Comercial/especificacoes';
import Informacoes from '../screens/Comercial/informacoes';
import Valores from "../screens/Comercial/valores";
import Disponibilidade from "../screens/Comercial/disponibilidade";

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

const HomeTab = () => {
  return (
    <ComercialTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Início") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Pedidos") {
            iconName = focused ? "archive-sharp" : "archive-sharp";
          } else if (route.name === "Produtos") {
            iconName = focused ? "ios-pricetags" : "ios-pricetags";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#E68202",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <ComercialTab.Screen
        name="Início"
        options={{ headerShown: false }}
        component={Comercial}
      />
      <ComercialTab.Screen
        name="Pedidos"
        options={({ navigation, route }) => ({
          headerRight: () => (
            <View style={{ paddingHorizontal: 20 }}>
              <Pressable
                style={{
                  height: "auto",
                  width: "auto",
                }}
              >
                <AntDesign name="infocirlceo" size={24} color="#0097A7" />
              </Pressable>
            </View>
          ),
        })}
        component={Pedidos}
      />
      <ComercialTab.Screen
        name="Produtos"
        options={({ navigation, route }) => ({
          headerRight: () => (
            <View style={{ paddingHorizontal: 20 }}>
              <Pressable
                onPress={() => {
                  navigation.navigate("Modal");
                }}
                style={{
                  height: "auto",
                  width: "auto",
                }}
              >
                <AntDesign name="plussquareo" size={24} color="#0097A7" />
              </Pressable>
            </View>
          ),
        })}
        component={Produtos}
      />
    </ComercialTab.Navigator>
  );
};

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
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <ComercialStack.Group screenOptions={{ presentation: "modal" }}>
        <ComercialStack.Screen
          name="AddProduto"
          options={{ headerShown: false }}
          component={Produto}
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
