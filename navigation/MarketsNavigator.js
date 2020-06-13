import React from "react"
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import ListScreen from "../screens/ListScreen";
import CompanyNavigator from "./CompanyNavigator";

enableScreens();
const Stack = createNativeStackNavigator();

export default function MarketsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Company" component={CompanyNavigator} />
    </Stack.Navigator>
  );
}