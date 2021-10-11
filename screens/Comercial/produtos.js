import React from "react";
import { Text, View, Pressable } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Produtos = () => {
  const [produtos, setProdutos] = React.useState(0);

  const navigation = useNavigation();

  return (
    <>
      {produtos === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="ios-pricetags" size={80} color="#777" />
          <Text
            style={{
              width: "80%",
              textAlign: "center",
              color: "#777",
              marginVertical: 10,
            }}
          >
            Você ainda não adicionou nenhum produto
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Modal");
            }}
            style={{
              width: "80%",
              marginTop: 10,
              height: 40,
              backgroundColor: "#0097A7",
              justifyContent: "center",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Adicionar produto</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Produtos;
