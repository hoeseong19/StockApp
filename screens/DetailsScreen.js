import React from 'react';
import { Text } from 'react-native'

export default function DetailsScreen({ route }) {
  const { company } = route.params;
  return (
    <Text>{company}</Text>
  );
}