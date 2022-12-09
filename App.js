import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthProvider from "./src/context/AuthProvider";

import Nav from "./src/components/Nav";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <Nav />
      </NavigationContainer>
    </AuthProvider>
  );
}
