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

const ConsultarAgronomos = () => {
  const { user } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);
  const [agronomos, setAgronomos] = React.useState(undefined);

  const [editAgronomo, setEditAgronomo] = React.useState(undefined);

  React.useEffect(() => {
    fetchAgronomos();
  }, []);

  const fetchAgronomos = async () => {
    const response = await Axios.post(
      "http://192.168.0.16:9903/api/v0/auth/Consultores",
      {
        empresaId: user.empresaId,
      }
    );
    response && setLoading(false);
    setAgronomos(response.data);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setEditAgronomo(item)}
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
                display: "flex",
                width: "80%",
              }}
            >
              <Text style={{ color: "#333", fontWeight: "bold", fontSize: 22 }}>
                {item.nome}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#aaa",
                  fontWeight: "bold",
                }}
              >
                {item.tipo}
              </Text>
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
            editAgronomo ? setEditAgronomo(undefined) : navigation.goBack()
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
            {editAgronomo ? "Voltar" : "Fechar"}
          </Text>
        </TouchableOpacity>
      </View>
      {editAgronomo ? (
        <>
          <Text style={{ color: "#333", fontWeight: "bold", fontSize: 22 }}>
            {editAgronomo.nome}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            {editAgronomo.tipo}
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
              data={agronomos}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
      )}
    </View>
  );
};

export default ConsultarAgronomos;
