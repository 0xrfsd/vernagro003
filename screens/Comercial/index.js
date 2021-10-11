import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import styled from "styled-components/native";

import AuthContext from "../../context/auth";

const Logo = require("../../assets/logo.png");
const Fortaleza = require("./fortaleza.png");
const Avatar = "https://github.com/ziulev.png";

const Carousel = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {},
}))``;

const Comercial = () => {
  const { user, signOut } = React.useContext(AuthContext);
  const [produtos, setProdutos] = React.useState(0);

  const userNome = user.nome;
  const nomeSobrenome = userNome.split(" ");
  const primeiroNome = nomeSobrenome[0];

  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut();
  };

  const Item = ({ icon, title, role }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          title === 'Adicionar produto' ? navigation.navigate('AddProduto') : null
        }}
        style={{
          height: 150,
          width: "49%",
          backgroundColor: "#fff",
          borderRadius: 5,
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "#E68202",
          }}
        >
          <FontAwesome5 name={icon} size={24} color="#fff" />
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 14, width: "70%" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
            {role}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          height: "auto",
          width: "100%",
          backgroundColor: "#fff",
          paddingBottom: 15,
          paddingTop: Platform.OS === "ios" ? 50 : 15,
        }}
      >
        <View
          style={{
            display: "flex",
            height: 40,
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <Image source={Fortaleza} style={{ width: 150, height: 40 }} />
          <TouchableOpacity onPress={() => navigation.navigate("Explorar")}>
            <Image
              style={{
                marginLeft: 10,
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#E68202",
              }}
              source={{ uri: Avatar }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
      {/* <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 16 }}>Seja muito bem-vindo(a)!</Text>
      <Text style={{ marginBottom: 20, marginLeft: 20, fontWeight: 'bold', fontSize: 20 }}>{userNome}</Text> */}
        <View
          style={{
            height: "auto",
            backgroundColor: "#fff",
            width: "100%",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Relatórios
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
            }}
          >
            Referente aos ultimos 7 dias
          </Text>
        </View>
        <View style={{ paddingLeft: 20, paddingBottom: 20, backgroundColor: "#fff" }}>
          <Carousel>
            <View
              style={{
                height: "auto",
                width: 100,
                marginRight: 10,
                padding: 10,
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: "#E68202",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 33 }}>
                17
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Produtos adicionados
              </Text>
            </View>

            <View
              style={{
                height: "auto",
                width: 100,
                marginRight: 10,
                padding: 10,
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: "#E68202",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 33 }}>
                3
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Agronomos adicionados
              </Text>
            </View>

            <View
              style={{
                height: "auto",
                width: 100,
                marginRight: 10,
                padding: 10,
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: "#E68202",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 33 }}>
                7
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Filiais adicionadas
              </Text>
            </View>
          </Carousel>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            height: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Produtos
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Adicionar, editar ou remover
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Item icon="tag" title="Adicionar produto" role="Suprimento" />
            <Item icon="tags" title="Consultar produtos" role="Suprimento" />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            height: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Filiais
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Adicionar, editar ou remover
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Item icon="store-alt" title="Adicionar filial" role="Gerencial" />
            <Item icon="store-alt" title="Consultar filiais" role="Gerencial" />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            height: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Agronomos
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Adicionar, editar ou remover
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Item
              icon="user-plus"
              title="Adicionar agronomo"
              role="Gerencial"
            />
            <Item
              icon="user-alt"
              title="Consultar agronomos"
              role="Gerencial"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            height: "auto",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Parâmetros
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Editar
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Item
              icon="align-left"
              title="Consultar parâmetros"
              role="Gerencial"
            />
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </>
  );
};

export default Comercial;
