import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";

// import { Camera, CameraType } from "expo-camera";

const Details = ({ route, navigation }) => {
  const category = route?.params?.info;
  const [url, setUrl] = useState("");
  const { loading, setLoading } = useAuth();

  async function takeAndUploadPhotoAsync() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,

      // aspect: [4, 3],
    });

    // // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.assets[0].uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects

    // the image shoud be same {image,file direction}
    formData.append("image", {
      uri: localUri,
      name: filename,
      type,
    });
    formData.append("key", `e27a90ae8a4859698cd132d85cbc3b0d`);
    setLoading(true);
    axios
      .post("https://api.imgbb.com/1/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        if (res.data.data.url) {
          setUrl(res.data.data.url);
          const main = res.data.data.url;
          setLoading(false);

          if (main) {
            navigation.navigate("SendToDB", {
              category: category,
              url: res.data.data.url,
            });
          }
        }
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong");
        setLoading(false);
        navigation.navigate("Home");
      });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }

    let localUri = result.assets[0].uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects

    // the image shoud be same {image,file direction}
    formData.append("image", {
      uri: localUri,
      name: filename,
      type,
    });
    formData.append("key", `e27a90ae8a4859698cd132d85cbc3b0d`);
    setLoading(true);
    axios
      .post("https://api.imgbb.com/1/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.data.url) {
          setUrl(res.data.data.url);
          const main = res.data.data.url;
          // alert("success");
          setLoading(false);
          if (main) {
            navigation.navigate("SendToDB", {
              category: category,
              url: res.data.data.url,
            });
          }
        }
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong");
        setLoading(false);
        navigation.navigate("Home");
      });
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
        marginHorizontal: 10,
      }}
    >
      {!loading && (
        <View>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "500",
              marginLeft: 10,
            }}
          >
            Select the method you want to send.
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={styles.camera}
              onPress={takeAndUploadPhotoAsync}
            >
              <Feather name="camera" size={44} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.camera} onPress={pickImage}>
              <MaterialIcons
                name="add-photo-alternate"
                size={50}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
  },
  camera: {
    backgroundColor: "white",
    width: 140,
    height: 140,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
