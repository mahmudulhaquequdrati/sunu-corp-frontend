import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Input,
  TextInput,
  Button,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { io } from "socket.io-client";

const SendToDB = ({ route, navigation }) => {
  const { user } = useAuth();
  const { url, category } = route.params;
  const [userInfo, setUserInfo] = useState({});
  const [description, setDescription] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [imgLoading2, setImgLoading2] = useState(true);

  // const handleFoucs = () => {
  //   setInputFocus(true);
  // };

  useEffect(() => {
    axios
      .get(
        `https://sunu-corp-backend-production.up.railway.app/api/user/${user?.email}`
      )
      .then((res) => {
        setUserInfo(res.data?.data);
      });
  }, []);

  // useEffect(() => {
  //   const socket = io("https://sunu-corp-backend-production.up.railway.app");

  // }, []);

  const data = {
    email: user.email,
    name: userInfo.name,
    number: userInfo.phone,
    picture: url,
    category: category,
    description: description,
    isEmailVerified: user.emailVerified,
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://sunu-corp-backend-production.up.railway.app/add-data",
        data
      )
      .then((res) => {
        if (res.status === 201) {
          const socket = io(
            "https://sunu-corp-backend-production.up.railway.app"
          );
          socket.emit("datas", {
            email: user.email,
            name: userInfo.name,
            number: userInfo.phone,
            picture: url,
            category: category,
            description: description,
            isEmailVerified: user.emailVerified,
            _id: res.data.data._id,
            date: new Date().toLocaleString(),
          });
          Alert.alert(
            "Success",
            "Your document has been sent to the admin. Once it is accepted, you will be notified."
          );
          navigation.navigate("Home");
        }
      });
  };

  return (
    <ScrollView
      style={{
        marginTop: 22,
      }}
    >
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          You have chosen :
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {category}
          </Text>
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontSize: 16,
            color: "grey",
          }}
        >
          Your document is down below.
        </Text>
        <View
          style={{
            // borderWidth: 1,
            alignItems: "center",
            marginTop: 10,
            position: "relative",
          }}
        >
          <Image
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,
            }}
            source={{
              uri: url,
            }}
            onLoad={() => setImgLoading2(false)}
          />

          {imgLoading2 ? (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 125,
                left: 125,
              }}
              size="large"
              color="#0A6AB6"
            />
          ) : null}
        </View>
        <TextInput
          multiline={true}
          textStyle={{ minHeight: 128 }}
          onFocus={() => setInputFocus(true)}
          placeholder="Write a description about your document."
          style={{
            borderWidth: 1,
            width: 300,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 20,
            borderRadius: 10,
            height: 150,
            padding: 15,
            textAlignVertical: "top",
            borderColor: "grey",
            paddingTop: 15,
          }}
          onEndEditing={() => setInputFocus(false)}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#0A6AB6",
            width: 300,
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 20,
            marginBottom: inputFocus ? 250 : 0,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default SendToDB;
