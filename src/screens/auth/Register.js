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
import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import StatusBar from "expo-status-bar/build/ExpoStatusBar";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Octicons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [onKeyboardShow, setOnKeyboardShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [dateOfBrith, setDateOfBrith] = useState("");
  const [placeOfBrith, setPlaceOfBrith] = useState("");
  const [address, setAddress] = useState("");
  const [yearOfDegree, setYearOfDegree] = useState("");
  const [majorOfDegree, setMajorOfDegree] = useState("");
  const [reasonForRequest, setReasonForRequest] = useState("");
  const [paymentConfirmation, setPaymentConfirmation] = useState("");

  const { sigUpUser, setUser, setLoading, loading } = useAuth();
  const auth = getAuth();

  const handleRegister = async () => {
    const userinfo = {
      name,
      email: email.toLowerCase(),
      phone: parseInt(number),
      date_of_birth: dateOfBrith,
      place_of_birth: placeOfBrith,
      address,
      year_of_degree: yearOfDegree,
      major_of_degree: majorOfDegree,
      reason_for_request: reasonForRequest,
      payment_confirmation: paymentConfirmation,
    };

    // validate the input
    if (!name) {
      Alert.alert("Attention required", "Please enter your name");
      return;
    }
    if (!email) {
      Alert.alert("Attention required", "Please enter your email");
      return;
    }
    if (!number) {
      Alert.alert("Attention required", "Please enter your number");
      return;
    }
    if (!password) {
      Alert.alert("Attention required", "Please enter your password");
      return;
    }
    if (!dateOfBrith) {
      Alert.alert("Attention required", "Please enter your date of brith");
      return;
    }

    if (!placeOfBrith) {
      Alert.alert("Attention required", "Please enter your place of brith");
      return;
    }
    if (!address) {
      Alert.alert("Attention required", "Please enter your address");
      return;
    }
    if (!yearOfDegree) {
      Alert.alert("Attention required", "Please enter your year of degree");
      return;
    }
    if (!majorOfDegree) {
      Alert.alert("Attention required", "Please enter your major of degree");
      return;
    }
    if (!reasonForRequest) {
      Alert.alert("Attention required", "Please enter your reason for request");
      return;
    }
    if (!paymentConfirmation) {
      Alert.alert(
        "Attention required",
        "Please enter your payment confirmation"
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Attention required",
        "Password must be at least 6 characters"
      );
      return;
    }

    // call a post method to save the user info to mongodb
    setLoading(true);
    sigUpUser(email, password)
      .then((userCredential) => {
        /// locahost: https://sunu-corp-backend-production.up.railway.app/
        //sunu-corp-backend-production.up.railway.app
        // https:
        axios
          .post(
            "https://sunu-corp-backend-production.up.railway.app/api/user",
            userinfo,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
        // setUser(null);
        // if (user) {
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
          Alert.alert("Email verification sent!", "please verify your email");
          setLoading(false);
        });
        // }

        // return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingBottom: onKeyboardShow ? 310 : 100,
        }}
      >
        <View>
          <Image
            source={require("../../../assets/images/logo.jpeg")}
            style={styles.image}
          />
          {/* View */}
          <ScrollView>
            <View style={styles.welcomeWrapper}>
              <Text style={styles.welcomeText}>Welcome to our app</Text>
              <Text style={styles.signUpText}>
                Sign Up with your name, email, number and password.
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <AntDesign name="user" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="name"
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Octicons name="number" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="numeric" // file type
                placeholder="Date of birth"
                onChangeText={(text) => setDateOfBrith(text)}
                // onChangeText={(text) => setName(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="find-replace" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="default"
                placeholder="Place of birth"
                onChangeText={(text) => setPlaceOfBrith(text)}
                // onChangeText={(text) => setName(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="email-address"
                placeholder="Email"
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Entypo name="phone" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="numeric"
                placeholder="Phone"
                style={styles.textInput}
                onChangeText={(text) => setNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Entypo name="address" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="default"
                placeholder="Address"
                style={styles.textInput}
                onChangeText={(text) => setAddress(text)}
                // onChangeText={(text) => setNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Octicons name="number" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="numeric"
                placeholder="Year of degree"
                style={styles.textInput}
                onChangeText={(text) => setYearOfDegree(text)}
                // onChangeText={(text) => setNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <AntDesign name="book" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="default"
                placeholder="Major of degree"
                style={styles.textInput}
                onChangeText={(text) => setMajorOfDegree(text)}
                // onChangeText={(text) => setNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <AntDesign name="unknowfile1" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="default"
                placeholder="Reason for request"
                style={styles.textInput}
                onChangeText={(text) => setReasonForRequest(text)}
                // onChangeText={(text) => setNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="payments" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                // onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="default"
                placeholder="Payment confirmation number"
                style={styles.textInput}
                onChangeText={(text) => setPaymentConfirmation(text)}
                // onChangeText={(text) => setNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Feather name="key" size={24} color="gray" />
              <TextInput
                onFocus={() => setOnKeyboardShow(true)}
                onEndEditing={() => setOnKeyboardShow(false)}
                keyboardType="password"
                placeholder="Password"
                style={styles.textInput}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.registerWrapper}
              onPress={handleRegister}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginWrapper}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Login</Text>
              </Pressable>
            </View>
          </ScrollView>

          <StatusBar style={"auto"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

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
  signUpText: {
    fontSize: 15,
    color: "#0F3460",
    marginTop: 5,
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
    paddingVertical: 15,
  },
  registerWrapper: {
    backgroundColor: "#6D67E4",
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  registerText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  loginWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    // some gap between text and button
  },
  loginText: {
    color: "#0F3460",
    fontSize: 15,
    fontWeight: "500",
  },
  loginLink: {
    color: "#6D67E4",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
