import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux';

function ListItem({ title, navigation }) {
  return (
    <Button 
      title={title}
      onPress={() => { navigation.navigate('Company', {company: title}); }}/>
  );
}

export default function ListScreen({ navigation }) {
  const companies = useSelector(state => state.companies);
  return (
    <SafeAreaView>
      <FlatList
        data={companies}
        renderItem={({ item }) => <ListItem title={item.description} navigation={navigation}/>}
        keyExtractor={item => `${item.symbol}`}
      />
    </SafeAreaView>
  );
}