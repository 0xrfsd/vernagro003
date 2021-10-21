import React from "react";
import Axios from 'axios';
import { Alert, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import AuthContext from "../../context/auth";

const AddProduto = () => {
  const { user } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [nome, setNome] = React.useState("");
  const [estado, setEstado] = React.useState("");

  const handleFilial = async () => {
    const response = await Axios.post(
      "http://192.168.0.16:9903/api/v0/core/filial",
      {
        empresaId: user.empresaId,
        nome: nome,
        estado: estado,
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
          Nome da filial
        </Text>
        <TextInput
          onChangeText={(nome) => setNome(nome)}
          style={{
            fontSize: 18,
            marginTop: 5,
            marginBottom: 10,
            paddingVertical: 10,
            borderRadius: 5,
            borderBottomColor: "#f2f2f2",
            borderBottomWidth: 1,
          }}
          placeholder="e.g. Padre Bernardo"
        />
        <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
          Estado
        </Text>
        <TextInput
          onChangeText={(estado) => setEstado(estado)}
          style={{
            fontSize: 18,
            marginTop: 5,
            marginBottom: 10,
            paddingVertical: 10,
            borderRadius: 5,
            borderBottomColor: "#f2f2f2",
            borderBottomWidth: 1,
          }}
          placeholder="e.g. GO"
        />
        <TouchableOpacity
          onPress={() => {
            if (nome.length == 0) {
              Alert.alert(
                "Não foi possível adicionar filial",
                "Por favor insira o nome da filial"
              );
            } else if (estado.length == 0) {
              Alert.alert(
                "Não foi possível adicionar filial",
                "Por favor insira o estado da filial"
              );
            } else {
              handleFilial();
            }
          }}
          style={{
            width: "100%",
            borderRadius: 5,
            height: 50,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E68202",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Adicionar filial
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProduto;
