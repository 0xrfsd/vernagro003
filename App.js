import "react-native-gesture-handler";

import { RecoilRoot } from "recoil";

import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";

import Routes from "./routes";

const App = () => {
  const [signed, setSigned] = React.useState(false);

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}
      />
      <NavigationContainer>
        <AuthProvider>
          <RecoilRoot>
            <Routes />
          </RecoilRoot>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
