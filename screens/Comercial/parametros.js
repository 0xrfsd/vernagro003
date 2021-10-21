import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const Parametros = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "#E68202",
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Parametros;
