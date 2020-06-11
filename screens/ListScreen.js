import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, FlatList, Button } from 'react-native'

function ListItem({ title, navigation }) {
  return (
    <Button 
      title={title}
      onPress={() => { navigation.navigate('Details', {company: title}); }}/>
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