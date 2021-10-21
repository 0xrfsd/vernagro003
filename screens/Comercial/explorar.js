import React from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../../context/auth";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import Avatar from "../../assets/profile.jpg";

const Explorar = () => {
  const { signed, user, signOut } = React.useContext(AuthContext);

  const navigation = useNavigation();

  const [editParam, setEditParam] = React.useState(undefined);

  const handleSignOut = () => {
    signOut();
  };

  const Item = ({ icon, color, title, bottom, page }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          title === "Sair da sua conta" && handleSignOut();
        }}
        style={{
          height: 50,
          width: "100%",
          marginTop: bottom ? 0 : 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 30,
              borderRadius: 5,
            }}
          >
            <Ionicons name={icon} size={16} color="#fff" />
          </View>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>{title}</Text>
        </View>
        {page && <AntDesign name="right" size={16} color="#777" />}
      </TouchableOpacity>
    );
  };

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
        <TouchableOpacity
          onPress={() =>
            editParam ? setEditParam(undefined) : navigation.goBack()
          }
        >
          <Text
            style={{
              color: "#E68202",
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            {editParam ? "Voltar" : "Fechar"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        {editParam === "Perfil" ? (
          <View style={{ backgroundColor: "#fff" }}>
            <View
              style={{
                height: "auto",
                width: "100%",
                padding: 20,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#333",
                  borderRadius: 60,
                }}
                onPress={() => {}}
              >
                <Text
                  style={{ fontSize: 10, color: "#333", textAlign: "center" }}
                >
                  Adicionar foto
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  color: "#333",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                Escolha uma foto de perfil que será vista por outros usuários e
                colaboradores, essa será sua imagem dentro do nosso ecosistema.
              </Text>
            </View>
            <Text
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#e1e1e1",
                fontSize: 18,
              }}
            >
              {user.nome}
            </Text>
            {/* <Text
              style={{
                marginTop: 20,
                marginLeft: 10,
                fontSize: 18,
              }}
            >
              Telefone
            </Text>
            <Text
              style={{
                backgroundColor: "#eee",
                marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#e1e1e1",
                fontSize: 18,
              }}
            >
              {user.telefone}
            </Text>
            <Text
              style={{
                marginTop: 20,
                marginLeft: 10,
                fontSize: 18,
              }}
            >
              CPF
            </Text>
            <Text
              style={{
                backgroundColor: "#eee",
                marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#e1e1e1",
                fontSize: 18,
              }}
            >
              317********
            </Text> */}
          </View>
        ) : editParam === "Conta" ? (
          <></>
        ) : editParam === "Privacidade" ? (
          <></>
        ) : editParam === "Termos de Serviço" ? (
          <></>
        ) : (
          <>
            <Text
              style={{
                color: "#333",
                fontWeight: "bold",
                fontSize: 26,
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Configurações
            </Text>
            <TouchableOpacity
              onPress={() => setEditParam("Perfil")}
              style={{
                marginTop: 10,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  source={Avatar}
                  style={{ height: 50, width: 50, borderRadius: 50 }}
                />
                <View style={{ marginLeft: 10, justifyContent: "center" }}>
                  <Text style={{ fontSize: 16 }}>{user.nome}</Text>
                  <Text style={{ color: "#999" }}>{user.tipo}</Text>
                </View>
              </View>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#eee",
                }}
              >
                <Ionicons name="pencil-outline" size={16} color="black" />
              </View>
            </TouchableOpacity>
            <Item
              icon="logo-whatsapp"
              color="#35C75A"
              title="Suporte via Whatsapp"
            />
            {/* <Item
              icon="notifications-outline"
              color="orange"
              title="Notificações"
              page
            /> */}
            <Item icon="key" color="#007AFF" title="Conta" page />
            <Item
              icon="lock-closed"
              color="orange"
              title="Privacidade"
              page
              bottom
            />
            <Item
              icon="information"
              color="#35C75A"
              title="Termos de serviço"
              page
            />
            <Item icon="exit-outline" color="grey" title="Sair da sua conta" />
            <View
              style={{
                paddingVertical: 100,
                height: "auto",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#aaa", width: "70%", textAlign: "center" }}
              >{`Propríedade intelectual de \nRicardo Fonseca Sarti Domene`}</Text>
              <Text
                style={{ color: "#aaa", width: "70%", textAlign: "center" }}
              >
                V0.0.3
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Explorar;
