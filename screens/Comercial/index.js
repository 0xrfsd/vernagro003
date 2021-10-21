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

import Avatar from "../../assets/profile.jpg";

const Logo = require("../../assets/logo.png");
const Fortaleza = require("../../assets/fortaleza.png");
const Avatar1 = "https://github.com/0xrfsd.png";
const Avatar2 = "https://github.com/dev4dev.png";

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
          title === "Consultar parâmetros" && navigation.navigate("Parametros");
          title === "Consultar agronomos" &&
            navigation.navigate("ConsultarAgronomos");
          title === "Adicionar agronomo" && navigation.navigate("AddAgronomo");
          title === "Adicionar filial" && navigation.navigate("AddFilial");
          title === "Adicionar produto" && navigation.navigate("AddProduto");
          title === "Consultar filiais" &&
            navigation.navigate("ConsultarFiliais");
          title === "Consultar produtos" &&
            navigation.navigate("ConsultarProdutos");
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
              source={Avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
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
            Esses são os relatórios da sua empresa
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 20,
            backgroundColor: "#fff",
          }}
        >
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
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 30 }}>
                11
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Pedidos fechados
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
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 30 }}>
                2
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Produtos registrados
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
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 30 }}>
                1
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Agronomos registrados
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
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 30 }}>
                7
              </Text>
              <Text style={{ marginTop: 5, color: "#fff" }}>
                Filiais registradas
              </Text>
            </View>
          </Carousel>
        </View>

        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Pedidos
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Consultar pedidos
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ConsultarPedidos")}
            style={{
              padding: 20,
              backgroundColor: "#fff",
              height: "auto",
              justifyContent: "space-between",
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
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
                <FontAwesome5 name="folder" size={24} color="#fff" />
              </View>
              <View style={{ marginLeft: 10, justifyContent: "center" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Consultar pedidos
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
                  Suprimento
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "orange",
                  fontWeight: "bold",
                }}
              >
                11
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
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
            Adicionar e consultar produtos
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
            Agronomos
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Adicionar e consultar agronomos
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
            Filiais
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              marginBottom: 10,
            }}
          >
            Adicionar e consultar filiais
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

        <View style={{ height: Platform.OS === "android" ? 20 : 50 }} />
      </ScrollView>
    </>
  );
};

export default Comercial;
