import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";

import AuthContext from "../../context/auth";

import { useNavigation } from "@react-navigation/native";

const SignUp = ({ route }) => {
  const { rota } = route.params;
  const { signed, user, signIn, signUp } = React.useContext(AuthContext);
  const [cpf, setCpf] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [error, setError] = React.useState("");
  const [empresaId, setEmpresaId] = React.useState(0);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    const response = await signUp(
      nome,
      empresaId,
      email,
      telefone,
      rota,
      cpf,
      senha
    );
    if (response) {
      setError(response);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Registrar {rota}</Text>
      <TextInput
        style={{
          height: 50,
          width: "100%",
          fontSize: 20,
        }}
        placeholder="Insira seu nome completo"
        value={nome}
        onChangeText={(nome) => setNome(nome)}
      />
      <TextInput
        style={{
          height: 50,
          width: "100%",
          fontSize: 20,
        }}
        placeholder="Insira seu email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
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
        placeholder="Insira seu telefone"
        value={telefone}
        onChangeText={(telefone) => setTelefone(telefone)}
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
          handleSignUp();
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
