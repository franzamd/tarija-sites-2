import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import { Alert } from "react-native";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { useNavigation } from "@react-navigation/native";
import { FacebookApi } from "../../utils/social";
import Loading from "../Loading";
import * as GoogleAuthentication from "expo-google-app-auth";

export default function LoginFacebook(props) {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    GoogleAuthentication.logInAsync({
      // androidStandaloneAppClientId: "ANDROID_STANDALONE_APP_CLIENT_ID",
      iosClientId:
        "53932243132-9f72oqt5ubn418nq6o2hu93vos2qn0rs.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })
      .then((logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          return firebase.auth().signInWithCredential(credential);

          // Successful sign in is handled by firebase.auth().onAuthStateChanged
        }
        return Promise.reject(); // Or handle user cancelation separatedly
      })
      .then((user) => {
        console.log("user", user);
        setLoading(false);
        navigation.navigate("account");
      })
      .catch((error) => {
        // ...
        console.log(error);
      });
  };

  const loginFB = async () => {
    try {
      await Facebook.initializeAsync(FacebookApi.application_id); // enter your Facebook App Id
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => {
            // All the details about user are in here returned from firebase
            console.log("Logged in successfully", user);
          })
          .catch((error) => {
            console.log("Error occurred ", error);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Google"
        button
        type="google"
        onPress={login}
      />
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={loginFB}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </>
  );
}
