import React from "react"
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import ListScreen from "../screens/ListScreen";
import DetailsScreen from "../screens/DetailsScreen";

enableScreens();
const Stack = createNativeStackNavigator();

export default function CompanyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}