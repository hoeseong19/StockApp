import React from "react"
import { enableScreens } from 'react-native-screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SummaryScreen from "../screens/SummaryScreen";
import DetailsScreen from "../screens/DetailsScreen";

enableScreens();
const Tab = createMaterialTopTabNavigator();

export default function CompanyNavigator({route}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Summary" component={SummaryScreen} initialParams={{ type: route.params.type }} />

      {(route.params.type === "Company") && <Tab.Screen name="Details" component={DetailsScreen} />}
    </Tab.Navigator>
  );
}