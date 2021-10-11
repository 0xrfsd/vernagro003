import React from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { proxy, useSnapshot } from "valtio";

import AuthContext from "../../context/auth";

export const addFilialState = proxy({
  empresaId: "",
  nome: "",
  estado: "",
});

const AddProduto = () => {
  const { user } = React.useContext(AuthContext);
  const snap = useSnapshot(addFilialState);
  const navigation = useNavigation();
  const [nome, setNome] = React.useState('');
  const [estado, setEstado] = React.useState('');

  addFilialState.empresaId = user.empresaId;
  addFilialState.nome = nome;
  addFilialState.estado = estado;

  const Select = ({ icon, title, description }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            title === "Disponibilidade"
              ? navigation.navigate("Disponibilidade")
              : title === "Valores"
              ? navigation.navigate("Valores")
              : null;
          }}
          style={{ height: "auto", width: "100%", backgroundColor: "#fff" }}
        >
          <View
            style={{
              paddingVertical: 10,
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name={icon} size={26} color="#777" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "#777", fontSize: 12 }}>{title}</Text>
                <Text style={{ fontSize: 16 }}>{description}</Text>
              </View>
            </View>
            <AntDesign name="right" size={16} color="#777" />
          </View>
        </TouchableOpacity>
        <View style={{ height: 1, width: "100%", backgroundCOlor: "#bbb" }} />
      </>
    );
  };

  return (
    <ScrollView style={{}}>
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ marginTop: 10, color: "#555" }}>Nome da filial</Text>
        <TextInput
          onChangeText={(nome) => setNome(nome)}
          style={{
            marginTop: -5,
            height: 50,
            width: "100%",
            borderBottomColor: "#eee",
            borderBottomWidth: 2,
            fontSize: 18,
          }}
          placeholder="e.g. Padre Bernardo"
        />
        <Text style={{ marginTop: 10, color: "#555" }}>Estado</Text>
        <TextInput
          onChangeText={(estado) => setEstado(estado)}
          placeholder="e.g. GO"
          style={{
            marginTop: -10,
            height: 50,
            width: "100%",
            fontSize: 18,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AddProduto;
