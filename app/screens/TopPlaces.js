import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import ListTopPlaces from "../components/Ranking/ListTopPlaces";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function TopPlaces(props) {
  const { navigation } = props;
  const [places, setPlaces] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    db.collection("places")
      .orderBy("rating", "desc")
      .limit(5)
      .get()
      .then((response) => {
        const placeArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          placeArray.push(data);
        });
        setPlaces(placeArray);
      });
  }, []);

  return (
    <View>
      <ListTopPlaces places={places} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
