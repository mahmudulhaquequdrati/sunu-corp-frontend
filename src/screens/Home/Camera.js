// import {
//   Button,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   StatusBar,
//   SafeAreaView,
//   Image,
//   Pressable,
// } from "react-native";
// import axios from "axios";

// import React, { useEffect, useRef, useState } from "react";
// import { Camera, CameraType } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";

// const OpenCamera = ({ route, navigation }) => {
//   const { category } = route?.params;
//   let cameraRef = useRef();
//   const [type, setType] = useState(CameraType.back);
//   const [hasCameraPermission, setHasCameraPermission] = useState();
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
//   const [photo, setPhoto] = useState();
//   function toggleCameraType() {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//   }

//   useEffect(() => {
//     (async () => {
//       const cameraPermission = await Camera.requestCameraPermissionsAsync();
//       const mediaLibraryPermission =
//         await MediaLibrary.requestPermissionsAsync();

//       setHasCameraPermission(cameraPermission.status);
//       setHasMediaLibraryPermission(mediaLibraryPermission.status);
//     })();
//   }, []);

//   if (hasCameraPermission === undefined) {
//     return (
//       <Text
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//           color: "gray",
//         }}
//       >
//         Requesting permissions...
//       </Text>
//     );
//   } else if (hasCameraPermission === "granted denied") {
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Text
//           style={{
//             color: "gray",
//             fontSize: 20,
//           }}
//         >
//           Permission for camera not granted. Please change this in settings.
//         </Text>
//       </View>
//     );
//   }

//   //   console.log(hasCameraPermission);

//   let takePic = async () => {
//     let options = {
//       quality: 0.1,
//       base64: true,
//       exif: false,
//     };

//     let newPhoto = await cameraRef.current.takePictureAsync(options);
//     setPhoto(newPhoto);
//   };

//   if (photo) {
//     let savePhoto = () => {
//       MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//         navigation.navigate({
//           name: "SendToDB",
//           params: {
//             photo: photo.base64,
//             category: category,
//           },
//         });
//         setPhoto(undefined);
//       });
//     };
//     // console.debug(photo);

//     return (
//       <SafeAreaView style={styles.container}>
//         <Image
//           style={styles.preview}
//           source={{ uri: "data:image/jpg;base64," + photo.base64 }}
//         />
//         {/* <Button title="Share" onPress={sharePic} /> */}
//         <View
//           style={{
//             flexDirection: "row",
//             // justifyContent: "space-between",
//             justifyContent: "space-around",
//           }}
//         >
//           {hasMediaLibraryPermission ? (
//             <View style={styles.buttons}>
//               <Pressable onPress={savePhoto}>
//                 <MaterialIcons name="save" size={30} color="blue" />
//               </Pressable>
//             </View>
//           ) : undefined}
//           <View style={styles.buttons}>
//             <Pressable onPress={() => setPhoto(undefined)}>
//               <MaterialIcons name="cancel" size={30} color="red" />
//             </Pressable>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   async function takeAndUploadPhotoAsync() {
//     // Display the camera to the user and wait for them to take a photo or to cancel
//     // the action
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     console.log(result.assets[0].uri);

//     // if (result.cancelled) {
//     //   return;
//     // }

//     // // ImagePicker saves the taken photo to disk and returns a local URI to it
//     let localUri = result.assets[0].uri;
//     let filename = localUri.split("/").pop();

//     // Infer the type of the image
//     let match = /\.(\w+)$/.exec(filename);
//     let type = match ? `image/${match[1]}` : `image`;

//     // Upload the image using the fetch and FormData APIs
//     let formData = new FormData();
//     // Assume "photo" is the name of the form field the server expects
//     // formData.append("photo", { uri: localUri, name: filename, type });

//     setHasCameraPermission(true);
//     setHasMediaLibraryPermission(true);

//     // the image shoud be same {image,file direction}
//     formData.append("image", {
//       uri: localUri,
//       name: filename,
//       type,
//     });
//     formData.append("key", `c8818fe821c0aee81ebf0b77344f0e2b`);
//     axios
//       .post("https://api.imgbb.com/1/upload", formData, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//         // transformRequest: (data, headers) => {
//         //   return formData;
//         // },
//       })
//       .then((res) => {
//         alert("success");
//         setUrl(res.data.data.url);
//       });

//     // return await fetch(YOUR_SERVER_URL, {
//     //   method: "POST",
//     //   body: formData,
//     //   headers: {
//     //     "content-type": "multipart/form-data",
//     //   },
//     // });
//   }

//   return (
//     <View>
//       {/* <Button
//         title="Pick an image from camera roll"
//         onPress={takeAndUploadPhotoAsync}
//       /> */}

//       <Camera style={styles.container} ref={cameraRef} type={type}></Camera>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: "#fff",
//             width: 60,
//             height: 60,
//             borderRadius: 50,
//             justifyContent: "center",
//             alignItems: "center",
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 2,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             elevation: 5,
//           }}
//           onPress={takeAndUploadPhotoAsync}
//         >
//           <View
//             style={{
//               backgroundColor: "gray",
//               width: 50,
//               height: 50,
//               borderRadius: 50,
//             }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.buttons} onPress={toggleCameraType}>
//           <MaterialIcons name="flip-camera-android" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OpenCamera;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     marginTop: 80,
//     height: 480,
//     marginHorizontal: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     // justifyContent: "space-between",
//     justifyContent: "space-around",
//     margin: 20,
//   },

//   preview: {
//     marginTop: 20,
//     height: 480,
//     marginHorizontal: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     marginBottom: 20,
//   },
//   buttons: {
//     backgroundColor: "#fff",
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginHorizontal: 10,
//   },
// });
