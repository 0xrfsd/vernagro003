import React from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Animated,
  Switch,
  TextInput,
} from "react-native";

import { LoginModal } from "./loginModal";

const Undraw0 = require("../../assets/gif.gif");
const Agronomist = require("../../assets/agronomist.png");
const Director = require("../../assets/director.gif");
const Intro = require("../../assets/intro.png");

const Auth = () => {
  const [tipo, setTipo] = React.useState("");

  const [senha, setSenha] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [error, setError] = React.useState("");

  const [dark, setDark] = React.useState(false);

  const produtorOpacity = new Animated.Value(0);
  const agronomoOpacity = new Animated.Value(0);
  const diretorOpacity = new Animated.Value(0);
  const initialOpacity = new Animated.Value(0);

  const [modal, setModal] = React.useState([]);

  React.useEffect(() => {
    if (tipo === "Produtor") {
      Animated.timing(agronomoOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(diretorOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(initialOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(produtorOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else if (tipo === "Agronomo") {
      Animated.timing(produtorOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(diretorOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(initialOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(agronomoOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else if (tipo === "Diretor") {
        Animated.timing(initialOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.timing(produtorOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.timing(agronomoOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      Animated.timing(diretorOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
        Animated.timing(diretorOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.timing(produtorOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.timing(agronomoOpacity, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      Animated.timing(initialOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [tipo]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? "#333" : "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          zIndex: 2,
          position: "absolute",
          top: 50,
          borderRadius: 5,
          backgroundColor: "transparent",
          width: 150,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: tipo === "Diretor" ? "#0097A7" : "#388960",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Vernagro®
        </Text>
      </View>
      <Animated.View
        style={{
          opacity: initialOpacity,
          transform: [
            { scale: 1 },
            {
              translateY: initialOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
          width: "100%",
          paddingTop: "30%",
          paddingBottom: "10%",
          zIndex: 1,
          height: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Image
          style={{ marginTop: -50, width: 200, height: 200 }}
          source={Intro}
        />
        <Text
          style={{
            width: "90%",
            textAlign: "center",
            fontSize: 20,
            color: dark ? "#fff" : "#333",
          }}
        >
          {`Um espaço para crescermos\ne gerarmos muitos frutos!`}
        </Text>
        <Text
          style={{
            marginTop: "35%",
            color: dark ? "#fff" : "#333",
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          Selecione sua atividade 👇🏻
        </Text>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => setTipo("Produtor")}
              style={{
                width: "49%",
                height: 50,
                backgroundColor: "#F2F2F2",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#777",
                  fontWeight: "bold",
                }}
              >
                Produtor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTipo("Agronomo")}
              style={{
                width: "49%",
                height: 50,
                backgroundColor: "#F2F2F2",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#777",
                  fontWeight: "bold",
                }}
              >
                Consultor
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setTipo("Diretor")}
            style={{
              width: "100%",
              height: 50,
              marginTop: 10,
              backgroundColor: "#F2F2F2",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "#777",
                fontWeight: "bold",
              }}
            >
              Revenda
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          opacity: produtorOpacity,
          transform: [
            { scale: 1 },
            {
              translateX: produtorOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
          height: "100%",
          width: "100%",
          zIndex: tipo === "Produtor" ? 1 : 0,
          backgroundColor: dark ? "#333" : "#FCFCFB",
          paddingTop: "45%",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Image
          source={Undraw0}
          style={{ width: "90%", borderRadius: 5, height: 250 }}
        />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              marginTop: "10%",
              textAlign: "center",
              marginVertical: 20,
              color: dark ? "#fff" : "#333",
            }}
          >
            O aplicativo do Produtor 🤠
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              width: "100%",
              backgroundColor: "#388960",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              modal[0].openModal();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Já possuo conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              width: "100%",
              backgroundColor: "#f2f2f2",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              handleSignIn();
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
              }}
            >
              Criar uma conta agora mesmo
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginTop: "auto",
            marginBottom: 50,
          }}
          onPress={() => setTipo("")}
        >
          <Text
            style={{
              color: dark ? "#fff" : "#333",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Selecionar outra atividade
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          opacity: agronomoOpacity,
          transform: [
            { scale: 1 },
            {
              translateX: agronomoOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          height: "100%",
          width: "100%",
          zIndex: tipo === "Agronomo" ? 1 : 0,
          backgroundColor: dark ? "#333" : "#fff",
          paddingTop: "45%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Image
          source={Agronomist}
          style={{ width: "90%", borderRadius: 5, height: 250 }}
        />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              marginTop: "10%",
              textAlign: "center",
              marginVertical: 20,
              color: dark ? "#fff" : "#333",
            }}
          >
            O aplicativo do Agronomo 🧑🏻‍🌾
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              width: "100%",
              backgroundColor: "#388960",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              modal[0].openModal();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Já possuo conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              width: "100%",
              backgroundColor: "#f2f2f2",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              handleSignIn();
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 16,
              }}
            >
              Criar uma conta agora mesmo
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginTop: "auto",
            marginBottom: 50,
          }}
          onPress={() => setTipo("")}
        >
          <Text
            style={{
              color: dark ? "#fff" : "#333",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Selecionar outra atividade
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          opacity: diretorOpacity,
          transform: [
            { scale: 1 },
            {
              translateY: diretorOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
          height: "100%",
          width: "100%",
          zIndex: tipo === "Diretor" ? 1 : 0,
          backgroundColor: dark ? "#333" : "#fff",
          paddingTop: "45%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Image
          source={Director}
          style={{ width: "90%", borderRadius: 5, height: 250 }}
        />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              marginTop: "10%",
              textAlign: "center",
              marginVertical: 20,
              color: dark ? "#fff" : "#333",
            }}
          >
            O aplicativo da Revenda 🏢
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              width: "100%",
              backgroundColor: "#0097A7",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              modal[0].openModal();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Já possuo conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 50,
              width: "100%",
              backgroundColor: "#f2f2f2",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              handleSignIn();
            }}
          >
            <Text
              style={{
                color: "#333",
                fontSize: 16,
              }}
            >
              Entrar em contato com o time de vendas
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginTop: "auto",
            marginBottom: 50,
          }}
          onPress={() => setTipo("")}
        >
          <Text
            style={{
              color: dark ? "#fff" : "#333",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Selecionar outra atividade
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <LoginModal modal={modal} setModal={setModal} modalIndex={0} />
    </View>
  );
};

export default Auth;
