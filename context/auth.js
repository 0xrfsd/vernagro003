import React, { createContext } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@Auth:user");
      const storagedToken = await AsyncStorage.getItem("@Auth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(cpf, senha) {
    const response = await auth.signIn(cpf, senha);
    if(response.data.status === "Erro!"){
      return response.data.error
    } 
    if(response.data.status === "Usuário logado com sucesso!"){
      setUser(response.data.data.user);
      await AsyncStorage.setItem("@Auth:user", JSON.stringify(response.data.data.user));
      await AsyncStorage.setItem("@Auth:token", JSON.stringify(response.data.data.token));
    }   
  }

  async function signUp(nome, empresaId, email, rota, telefone, cpf, senha) {
    const response = await auth.signUp(nome, empresaId, email, telefone, rota, cpf, senha);
    if(response.data.status === "Erro!"){
      return response.data.error
    } 
    if(response.data.status === "Usuário criado com sucesso!"){
      setUser(response.data.data.user);
      await AsyncStorage.setItem("@Auth:user", JSON.stringify(response.data.data.user));
      await AsyncStorage.setItem("@Auth:token", JSON.stringify(response.data.data.token));
    }   
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
