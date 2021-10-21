import React from "react";
import Axios from "axios";
import { cpf } from "cpf-cnpj-validator";
import { Alert, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";
import AuthContext from "../../context/auth";

const AddAgronomo = () => {
  const { user } = React.useContext(AuthContext);

  const navigation = useNavigation();

  const [error, setError] = React.useState("");

  const [onboarding, setOnboarding] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const [nome, setNome] = React.useState("");
  const [CPF, setCPF] = React.useState("");
  const [telefone, setTelefone] = React.useState("");

  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");

  const addAgronomo = async () => {
    const response = await Axios.post(
      "http://192.168.0.16:9903/api/v0/auth/Consultor",
      {
        empresaId: user.empresaId,
        creatorId: user.id,
        nome: nome,
        cpf: CPF,
        telefone: telefone,
        psenha: senha,
      }
    );
    if (response.data.status === "Erro!") {
      setError(response.data.error);
    }
    if (response.data.status === "Usuário criado com sucesso!") {
      Alert.alert(
        "Agronomo registrado",
        `${nome} foi registrado com sucesso e agora poderá acessar o aplicativo utilizando seu CPF e sua Senha`,
        [
          {
            text: "Confirmar",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
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
        <TouchableOpacity
          onPress={() => {
            onboarding ? setOnboarding(!onboarding) : navigation.goBack();
          }}
        >
          <Text
            style={{
              color: "#E68202",
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            {onboarding ? "Voltar" : "Fechar"}
          </Text>
        </TouchableOpacity>
        {onboarding && (
          <>
            <TouchableOpacity onPress={() => setHidden(!hidden)}>
              <FontAwesome5
                name={!hidden ? "eye" : "eye-slash"}
                size={24}
                color="#E68202"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {onboarding ? (
          <>
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              Senha que será utilizada pelo agronomo
            </Text>
            <TextInput
              value={senha}
              onChangeText={(senha) => setSenha(senha)}
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              secureTextEntry={hidden ? true : false}
              placeholder="e.g. S3nhaSegur4!"
            />
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              Confirme a senha que será utilizada pelo agronomo
            </Text>
            <TextInput
              value={confirmarSenha}
              onChangeText={(confirmarSenha) =>
                setConfirmarSenha(confirmarSenha)
              }
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              secureTextEntry={hidden ? true : false}
              placeholder="e.g. S3nhaSegur4!"
            />
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <TouchableOpacity
              onPress={() => {
                if (senha.length == 0) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "Por favor insira a senha utilizada pelo agronomo"
                  );
                } else if (confirmarSenha.length == 0) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "Por favor confirme a senha utilizada pelo agronomo"
                  );
                } else if (confirmarSenha !== senha) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "As senhas não se coincidem"
                  );
                } else {
                  addAgronomo();
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
                Adicionar agronomo
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              Nome do agronomo
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
              placeholder="e.g. Lucas Ferreira"
            />
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              CPF do agronomo
            </Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={11}
              onChangeText={(CPF) => setCPF(CPF)}
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              placeholder="e.g. 00000000000"
            />
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              Telefone do agronomo
            </Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={11}
              onChangeText={(telefone) => setTelefone(telefone)}
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              placeholder="e.g. 62981998899"
            />
            <TouchableOpacity
              onPress={() => {
                if (nome.length == 0) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "Por favor insira o nome do agronomo"
                  );
                } else if (cpf.length == 0) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "Por favor insira o cpf do agronomo"
                  );
                } else if (!cpf.isValid(CPF)) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "Por favor insira um cpf valido"
                  );
                } else if (telefone.length == 0) {
                  Alert.alert(
                    "Não foi possível adicionar o agronomo",
                    "Por favor insira o telefone do agronomo"
                  );
                } else {
                  setOnboarding(true);
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
                Próximo
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default AddAgronomo;
