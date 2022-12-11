import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import initialFirebase from "../services/firebase";

initialFirebase();

const useFirebase = () => {
  const auth = getAuth();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const sigUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loggedInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    signOut(auth)
      .then(() => {
        Alert.alert(
          "Sign out successful",
          "Please login again to access the app"
        );
        setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        // ...
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [user]);

  return {
    user,
    sigUpUser,
    loggedInUser,
    setUser,
    logOutUser,
    loading,
    setLoading,
  };
};

export default useFirebase;
