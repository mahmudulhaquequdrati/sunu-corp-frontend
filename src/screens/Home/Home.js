import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { io } from "socket.io-client";

import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Feather } from "@expo/vector-icons";

const websocket = () => {
  io("https://sunu-corp-backend-production.up.railway.app");
};

const Home = ({ navigation }) => {
  useEffect(() => {
    //http://localhost:5000/
    // https://sunu-corp-backend-production.up.railway.app
    // const socket = io("https://sunu-corp-backend-production.up.railway.app");
    websocket();

    // * socket.on with the event name meaning i am listening to the event name in from the server
    // socket.on("message", (data) => {
    //   console.log(data);
    // })
  }, []);

  const { logOutUser } = useAuth();
  const handleLogout = () => {
    logOutUser();
  };
  const DATA = [
    {
      id: "1",
      icon: (
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 5,
          }}
          source={require("../../../assets/images/science.jpg")}
        />
      ),
      name: "Attestation-Speciale",
      label: "Attestation Speciale",
    },
    {
      id: "2",
      icon: (
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 5,
          }}
          source={require("../../../assets/images/physics.jpg")}
        />
      ),
      name: "Diplôme-du-Bac",
      label: "Diplôme du Bac",
    },
    {
      id: "3",
      icon: (
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 5,
          }}
          source={require("../../../assets/images/certificate.jpg")}
        />
      ),
      name: "Duplicata-Diplôme-Bac",
      label: "Duplicata Diplôme Bac",
    },
    {
      id: "4",
      icon: (
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 5,
          }}
          source={require("../../../assets/images/library.jpg")}
        />
      ),
      name: "Relevés-de-Notes",
      label: "Relevés de Notes",
    },
  ];
  const Item = ({ item }) => {
    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          navigation.navigate({
            name: "Details",
            params: {
              info: item.name,
            },
          });
        }}
      >
        {item.icon}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            // marginTop: 10,
          }}
        >
          {item?.label}
        </Text>
      </Pressable>
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <View style={styles.container}>
      <View>
        {/* make a logout buttom */}
        <View
          style={{
            position: "absolute",
            right: 20,
            top: 35,
            backgroundColor: "white",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
            zIndex: 100,
            padding: 10,
          }}
        >
          <Feather
            onPress={handleLogout}
            name="log-out"
            size={24}
            color="gray"
            style={{
              borderRadius: 50,
              backgroundColor: "white",
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 35,
          paddingLeft: 30,
          width: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "500",
            color: "#065CA8",
          }}
        >
          Welcome to Sunu Corp
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#0F3D8B",
            marginTop: 2,
            width: 250,
          }}
        >
          Please chose a category to get the service
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            // paddingHorizontal: 20,
            flex: 1,
            flexDirection: "column",
          }}
        >
          {/* make a card where there will be a picture and text */}
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 5,
    height: 150,
    // borderWidth: 1,
  },
});
