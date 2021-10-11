import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";

import AuthContext from "../../context/auth";

import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const { signed, user, signIn } = React.useContext(AuthContext);
  const [cpf, setCpf] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState("");

  const navigation = useNavigation();

  const handleSignIn = async () => {
    const response = await signIn(cpf, senha);
    if (response) {
      setError(response);
    }
  };

  const SignUp = ({ nome }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp", {
            rota: nome,
          });
        }}
        style={{
          height: 50,
          width: "auto",
          paddingHorizontal: 10,
          backgroundColor: "#333",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>{nome}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{
          height: 50,
          width: "100%",
          fontSize: 20,
        }}
        placeholder="Insira seu CPF"
        value={cpf}
        onChangeText={(cpf) => setCpf(cpf)}
      />
      <TextInput
        style={{
          height: 50,
          width: "100%",
          fontSize: 20,
        }}
        placeholder="Insira sua senha"
        value={senha}
        secureTextEntry={true}
        onChangeText={(senha) => setSenha(senha)}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <TouchableOpacity
        style={{
          marginTop: 10,
          height: 50,
          width: "100%",
          backgroundColor: "#333",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          handleSignIn();
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>SignIn</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Registrar
      </Text>
      <View
        style={{
          height: "auto",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <SignUp nome="Produtor" />
        <SignUp nome="Consultor" />
        <SignUp nome="Comercial" />
        <SignUp nome="Diretor" />
      </View>
    </View>
  );
};

export default SignIn;
