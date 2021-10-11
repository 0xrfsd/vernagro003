import React from "react";
import { Text, View, Pressable } from "react-native";
import AuthContext from "../../context/auth";

const Explorar = () => {
  const { signed, user, signOut } = React.useContext(AuthContext);

    const handleSignOut = () => {
      signOut();
    };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
        <Text>ID: {user.id}</Text>
        <Text>ID: {user.empresaId}</Text>
        <Text>{user.nome}</Text>
        <Text>{user.tipo}</Text>
        <Pressable onPress={handleSignOut} style={{ height: 50, width: '100%', marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 20}}>
            <Text>Sair da sua conta</Text>
        </Pressable>
    </View>
  );
};


export default Explorar;