// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3MwNNh2ZooiMq1wuLrbmyCjipBSFnK-g",
  authDomain: "sunu-corp.firebaseapp.com",
  projectId: "sunu-corp",
  storageBucket: "sunu-corp.appspot.com",
  messagingSenderId: "538345062531",
  appId: "1:538345062531:web:37b486829ab9e4ad301bb6",
};

// Initialize Firebase
const initialFirebase = () => {
  initializeApp(firebaseConfig);
};

export default initialFirebase;
