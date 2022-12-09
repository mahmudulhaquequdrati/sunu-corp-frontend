import { View, Text } from "react-native";
import React from "react";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Home from "../screens/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import Details from "../screens/Home/Details";
import OpenCamera from "../screens/Home/Camera";
import SendToDB from "../screens/Home/SendToDB";

const Nav = () => {
  const Stack = createNativeStackNavigator();
  const { user, loading } = useAuth();

  return (
    <Stack.Navigator>
      {user === null && !loading ? (
        <Stack.Group>
          <Stack.Screen
            name="LogIn"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Camera"
            component={OpenCamera}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="SendToDB"
            component={SendToDB}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Nav;
