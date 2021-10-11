import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { Modalize } from "react-native-modalize";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from "../../context/auth";

export function SimpleModal(props) {
  const { signed, user, signIn } = React.useContext(AuthContext);

  const [opened, setOpened] = useState(false);

  const [keyboardAvoid, setKeyboardAvoid] = useState(false);

  const modalizeRef = useRef(<Modalize />);

  const handleSignIn = async () => {
    const response = await signIn(cpf, senha);
    if (response) {
      setError(response);
    }
  };

  // Função executada apenas quando o componente for montado pela primeira vez
  useEffect(() => {
    let { setModal, modal, modalIndex } = props;

    modal[modalIndex] = {
      openModal: () => openModal(),
      closeModal: () => closeModal(),
    };

    setModal(modal);
  }, []);
 
  const handlerStateChange = (state) => {
    setOpened(state);
  };

  const openModal = () => {
    modalizeRef.current.open();
  };

  const closeModal = () => {
    modalizeRef.current.close();
  };

  const navigation = useNavigation();

  const [keyboardHeight, setKeyboardHeight] = React.useState(275);

  const [esqueceu, setEsqueceu] = React.useState(false);
  const [esqueceuEmail, setEsqueceuEmail] = React.useState("");
  const [esqueceuEnviado, setEsqueceuEnviado] = React.useState(false);

  const [cpf, setCpf] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState("");

  const modalMargin = error.length > 0 ? -10 : -25;

  const format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  const cpfTextInput = React.createRef();
  const passwordTextInput = React.createRef();

  const renderHeader = useCallback(() => {
    return (
      <>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold" }}>
            Entre em sua conta agora mesmo!
          </Text>
          <Text style={{ color: "#333", fontSize: 14 }}>
            Isso vai levar menos de um minuto
          </Text>
        </View>
      </>
    );
  }, [esqueceu]);

  const renderContent = useCallback(() => {
    return (
      <>
        <View style={{ marginTop: 1 }}>
            <Text>Content</Text>
        </View>
      </>
    );
  }, []);

  const modalHeight = 360 + modalMargin;

  return (
    <>
      <Modalize
        handlePosition="inside"
        ref={modalizeRef}
        onOpened={() => handlerStateChange(true)}
        onClosed={() => {
          setError("");
          setEsqueceu(false);
          setKeyboardAvoid(false);
          handlerStateChange(false);
        }}
        modalHeight={300}
        HeaderComponent={() => renderHeader()}
      >
        {renderContent()}
      </Modalize>
    </>
  );
}

const s = StyleSheet.create({
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: "200",
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: 15,

    height: 60,

    borderBottomColor: "#f9f9f9",
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: "hidden",

    backgroundColor: "#eee",
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: "center",
    justifyContent: "center",

    marginVertical: 20,
  },
});
