import React, { useState, useEffect } from "react"
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ListScreen from "../screens/ListScreen";
import CompanyNavigator from "./CompanyNavigator";
import { addCompany, removeCompany } from "../actions";

enableScreens();
const Stack = createNativeStackNavigator();

export default function MarketsNavigator({ route }) {
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist);
  const selected = useSelector(state => state.selected);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(false);
    watchlist.forEach((item) => {
      if(item.symbol === selected.symbol) {
        setIsEnabled(true);
      }
      console.log(item.symbol);
      console.log(selected.symbol);
    })
  })

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="List" 
        component={ListScreen}
        options={{headerShown: false}}
        initialParams={{ type: route.name }} />
      <Stack.Screen 
        name="Company" 
        component={CompanyNavigator}
        options={({ route }) => ({ title: route.params.symbol, headerRight: () => (
          <Switch
            onValueChange={() => {
              if(isEnabled) {
                dispatch(removeCompany(selected));
              } else {
                dispatch(addCompany(selected));
              }
              setIsEnabled(previousState => !previousState);
            }}
            value={isEnabled}/>
        ), })} 
        initialParams={({ route }) => ({ title: route.params.type})}/>
    </Stack.Navigator>
  );
}