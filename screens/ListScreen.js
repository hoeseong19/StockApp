import React from 'react';
import { SafeAreaView, FlatList, Button, Text, SectionList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";

import { setCompany } from '../actions';

const SectionHeader = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;
const Symbol = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const LeftView = styled.View`
  flex: 0.7;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.View`
  display: flex;
  flex-direction: row;
  height: 70px;
  margin: 5px 10px;
  padding: 0px 15px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  background: #FFF;
`;
function ListItem({ symbol, description, navigation }) {
  const dispatch = useDispatch();

  return (
    <Card>
      <LeftView>
        <Symbol>{symbol}</Symbol>
        <Text>{description}</Text>
      </LeftView>
      <Button 
        style={{flex: 0.3}}
        title="See Details"
        onPress={() => { navigation.navigate('Company'); dispatch(setCompany(symbol)); }}/>
    </Card>
  );
}

export default function ListScreen({ navigation }) {
  const companies = useSelector(state => state.symbols.us);
  const indices = useSelector(state => state.symbols.indices);

  return (
    <SafeAreaView>
      <SectionList
        sections={[{ title: "Companies", data: companies }, { title: "Indices", data: indices }]}
        keyExtractor={(item) => `${item.symbol}` }
        renderItem={({ item }) => <ListItem symbol={item.symbol} description={item.description} navigation={navigation}/>}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
      />
    </SafeAreaView>
  );
}