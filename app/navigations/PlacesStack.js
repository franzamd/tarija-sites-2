import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Places from "../screens/Places/Places";
import AddPlace from "../screens/Places/AddPlace";
import Place from "../screens/Places/Place";
import AddReviewPlace from "../screens/Places/AddReviewPlace";

const Stack = createStackNavigator();

export default function ResaturantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="places"
        component={Places}
        options={{ title: "Sitios" }}
      />
      <Stack.Screen
        name="add-place"
        component={AddPlace}
        options={{ title: "Añadir nuevo sitio" }}
      />
      <Stack.Screen name="place" component={Place} />
      <Stack.Screen
        name="add-review-place"
        component={AddReviewPlace}
        options={{ title: "Nuevo comentario" }}
      />
    </Stack.Navigator>
  );
}
