import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListPlaces from "../../components/Places/ListPlaces";

const db = firebase.firestore(firebaseApp);

export default function Places(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [totalResaturants, setTotalResaturants] = useState(0);
  const [startPlaces, setStartPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitPlaces = 10;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("places")
        .get()
        .then((snap) => {
          setTotalResaturants(snap.size);
        });

      const resultPlaces = [];

      db.collection("places")
        .orderBy("createAt", "desc")
        .limit(limitPlaces)
        .get()
        .then((response) => {
          setStartPlaces(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const place = doc.data();
            place.id = doc.id;
            resultPlaces.push(place);
          });
          setPlaces(resultPlaces);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultPlaces = [];
    places.length < totalResaturants && setIsLoading(true);

    db.collection("places")
      .orderBy("createAt", "desc")
      .startAfter(startPlaces.data().createAt)
      .limit(limitPlaces)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartPlaces(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const place = doc.data();
          place.id = doc.id;
          resultPlaces.push(place);
        });

        setPlaces([...places, ...resultPlaces]);
      });
  };

  return (
    <View style={styles.viewBody}>
      <ListPlaces
        places={places}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />

      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#46bbfe"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-place")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#cff7ff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
