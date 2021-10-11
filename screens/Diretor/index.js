import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import AuthContext from "../../context/auth";

const Diretor = () => {
  const { user, signOut } = React.useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "black", fontSize: 16 }}>{user.tipo}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={{ color: "blue", fontSize: 16 }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Diretor;
