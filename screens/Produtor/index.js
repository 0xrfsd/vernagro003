import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import AuthContext from "../../context/auth";

const Produtor = () => {
  const { user, signOut } = React.useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "black", fontSize: 16 }}>{user.tipo}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          height: 50,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: "#333",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Produtor;
