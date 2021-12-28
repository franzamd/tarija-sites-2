import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListPlaces(props) {
  const { places, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();

  return (
    <View>
      {size(places) > 0 ? (
        <FlatList
          data={places}
          renderItem={(place) => (
            <Place place={place} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderPlaces}>
          <ActivityIndicator size="large" />
          <Text>Cargando sitios</Text>
        </View>
      )}
    </View>
  );
}

function Place(props) {
  const { place, navigation } = props;
  const { id, images, name, address, description } = place.item;
  const imagePlace = images ? images[0] : null;

  const goPlace = () => {
    navigation.navigate("place", {
      id,
      name,
      titleHeader: "Sitio"
    });
  };

  return (
    <TouchableOpacity onPress={goPlace}>
      <View style={styles.viewPlace}>
        <View style={styles.viewPlaceImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="fff" />}
            source={
              imagePlace
                ? { uri: imagePlace }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.imagePlace}
          />
        </View>
        <View>
          <Text style={styles.placeName}>{name}</Text>
          <Text style={styles.placeAddress}>{address}</Text>
          <Text style={styles.placeDescription}>
            {description.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderPlaces}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundPlaces}>
        <Text>No quedan sitios por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderPlaces: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewPlace: {
    flexDirection: "row",
    margin: 10,
  },
  viewPlaceImage: {
    marginRight: 15,
  },
  imagePlace: {
    width: 80,
    height: 80,
  },
  placeName: {
    fontWeight: "bold",
  },
  placeAddress: {
    paddingTop: 2,
    color: "grey",
  },
  placeDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundPlaces: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
