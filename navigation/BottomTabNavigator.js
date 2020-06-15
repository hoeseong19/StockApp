import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import TabBarIcon from '../components/TabBarIcon';
import NewsScreen from '../screens/NewsScreen';
import MarketsNavigator from './MarketsNavigator';

import { loadUsEx, loadIndices } from "../actions/index";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'News';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUsEx());
    dispatch(loadIndices());
  }, [])

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: 'News',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-paper" />,
        }}
      />
      <BottomTab.Screen
        name="Markets"
        component={MarketsNavigator}
        options={{
          title: 'Markets',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-trending-up" />,
        }}
      />
      <BottomTab.Screen
        name="WatchList"
        component={MarketsNavigator}
        options={{
          title: 'WatchList',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-star" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'News':
      return 'News';
    case 'Markets':
      return 'Markets';
    case 'WatchList':
      return 'WatchList';
  }
}
