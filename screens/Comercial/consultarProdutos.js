import React from "react";
import Axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/auth";
import { AntDesign } from "@expo/vector-icons";

const ConsultarProdutos = () => {
  const { user } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);
  const [produtos, setProdutos] = React.useState(undefined);

  const [editProduto, setEditProduto] = React.useState(undefined);

  React.useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const response = await Axios.post(
      "http://192.168.0.16:9903/api/v0/core/produtos",
      {
        empresaId: user.empresaId,
      }
    );
    response && setLoading(false);
    setProdutos(response.data);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setEditProduto(item)}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "auto",
            backgroundColor: "#fff",
            justifyContent: "space-between",
            padding: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "80%",
              }}
            >
              <Text style={{ color: "#333", fontWeight: "bold", fontSize: 22 }}>
                {item.nome}
              </Text>
              <Text
                style={{
                  color: "#aaa",
                  fontWeight: "bold",
                }}
              >
                {item.fornecedor}
              </Text>
              <Text
                style={{
                  color: "#aaa",
                  fontWeight: "bold",
                }}
              >
                {item.tipo}
              </Text>
              <Text
                style={{
                  color: "#aaa",
                  fontWeight: "bold",
                }}
              >
                {item.principioativo}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#aaa",
                    fontWeight: "bold",
                  }}
                >
                  {item.embalagem}
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    color: "#aaa",
                    fontWeight: "bold",
                  }}
                >
                  {item.quantidade} Kg/L
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={16} color="#777" />
          </View>
        </TouchableOpacity>
        <View style={{ height: 1, width: "100%", backgroundColor: "#eee" }} />
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
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
            editProduto ? setEditProduto(undefined) : navigation.goBack()
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
            {editProduto ? "Voltar" : "Fechar"}
          </Text>
        </TouchableOpacity>
      </View>
      {editProduto ? (
        <>
          <Text
            style={{
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            {editProduto.nome}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            {editProduto.fornecedor}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            {editProduto.principioativo}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            {editProduto.embalagem}
          </Text>
        </>
      ) : (
        <>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#E68202" />
            </View>
          ) : (
            <FlatList
              style={{ width: "100%" }}
              data={produtos}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ConsultarProdutos;
