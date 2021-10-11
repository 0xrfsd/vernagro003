import React from "react";
import { Text, View, Pressable } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Pedidos = () => {
  const [produtos, setProdutos] = React.useState(0);

  const navigation = useNavigation();

  return (
    <>
      {produtos === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="archive-sharp" size={80} color="#777" />
          <Text style={{ width: "80%", textAlign: "center", color: "#777", marginVertical: 10 }}>
            Você ainda não possui nenhum pedido
          </Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Pedidos;
