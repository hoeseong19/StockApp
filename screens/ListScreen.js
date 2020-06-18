import React, { useEffect } from 'react';
import { SafeAreaView, Button, Text, SectionList, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";

import { setCompany } from '../actions';
import Indices from '../components/Indices';
import { ScrollView } from 'react-native-gesture-handler';

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
function ListItem({ item, navigation }) {
  const { symbol, description } = item;
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
        onPress={() => { navigation.navigate('Company', { symbol: symbol, type: "Company" }); dispatch(setCompany(item)); }}/>
    </Card>
  );
}

export default function ListScreen({ navigation, route }) {
  const companies = useSelector(state => state.symbols.us);
  const watchlist = useSelector(state => state.watchlist);

  if (route.params.type === "Markets") {
    return (
      <SafeAreaView>
        <ScrollView>
          <Indices navigation={navigation}/>
          <SectionList
            sections={[
              { title: "Companies", data: companies }]}
            keyExtractor={(item) => `${item.symbol}` }
            renderItem={({ item }) => <ListItem item={item} navigation={navigation}/>}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader>{title}</SectionHeader>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } else if (route.params.type === "WatchList") {
    return (
      <SafeAreaView>
        <ScrollView>
          <FlatList
            data={watchlist}
            keyExtractor={(item) => `${item.symbol}` }
            renderItem={({ item }) => <ListItem item={item} navigation={navigation}/>}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}