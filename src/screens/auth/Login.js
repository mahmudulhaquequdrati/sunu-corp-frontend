import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import StatusBar from "expo-status-bar/build/ExpoStatusBar";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";

const Login = ({ navigation }) => {
  const { loggedInUser, setUser, setLoading, loading } = useAuth();
  const [onKeyboardShow, setOnKeyboardShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    loggedInUser(email, password)
      .then((userCredential) => {
        // Signed in
        if (!userCredential.user.emailVerified) {
          // setUser(null);
          Alert.alert(
            "Please verify your email.",
            "Else you will not get the service via email"
          );
          setUser(userCredential.user);
          setLoading(false);
        } else {
          setUser(userCredential.user);
          setLoading(false);
          // Alert.alert("Login Success");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
        return;
        // setUser(null);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {!loading ? (
        <View
          style={{
            paddingBottom: onKeyboardShow ? 310 : 0,
          }}
        >
          <Image
            source={require("../../../assets/images/logo.jpeg")}
            style={styles.image}
          />
          <View>
            <View style={styles.welcomeWrapper}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.signInText}>
                Sign in with your email and password
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={24} color="gray" />
              <TextInput
                //   onEndEditing={() => setOnKeyboardShow(false)}
                onFocus={() => setOnKeyboardShow(true)}
                placeholder="Email"
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Feather name="key" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                onEndEditing={() => setOnKeyboardShow(false)}
                placeholder="Password"
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.loginWrapper}
              onPress={handleSignIn}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            {/* create an account */}
            <View style={styles.createAccountWrapper}>
              <Text style={styles.createAccountText}>
                Don't have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={styles.createAccountLink}>Create an account</Text>
              </Pressable>
            </View>
          </View>

          <StatusBar style="auto" />
        </View>
      ) : (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 300,
          }}
          size="large"
        />
      )}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 30,
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    width: 200,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeWrapper: {
    paddingLeft: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#6D67E4",
  },
  signInText: {
    fontSize: 15,
    color: "#0F3460",
  },
  inputWrapper: {
    marginTop: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "darkgray",
  },
  textInput: {
    paddingLeft: 10,
    fontSize: 15,
    color: "#0F3460",
    width: "100%",
  },
  loginWrapper: {
    backgroundColor: "#6D67E4",
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  loginText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  createAccountWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  createAccountText: {
    color: "darkblue",
    fontSize: 15,
  },
  createAccountLink: {
    color: "#6D67E4",
    fontSize: 15,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#6D67E4",
    marginLeft: 5,
  },
});
