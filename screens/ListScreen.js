import React from 'react';
import { SafeAreaView, FlatList, Button } from 'react-native'

function ListItem({ title, navigation }) {
  return (
    <Button 
      title={title}
      onPress={() => { navigation.navigate('Details', {company: title}); }}/>
  );
}

export default function ListScreen({ navigation }) {
  const companies = [
    {
        "description": "AGILENT TECHNOLOGIES INC",
        "displaySymbol": "A",
        "symbol": "A"
    },
    {
        "description": "ALCOA CORP",
        "displaySymbol": "AA",
        "symbol": "AA"
    },
    {
        "description": "PERTH MINT PHYSICAL GOLD ETF",
        "displaySymbol": "AAAU",
        "symbol": "AAAU"
    },
    {
        "description": "ATA CREATIVITY GLOBAL - ADR",
        "displaySymbol": "AACG",
        "symbol": "AACG"
    },
    {
        "description": "ADVISORSHARES DORSEY WRIGHT",
        "displaySymbol": "AADR",
        "symbol": "AADR"
    },
    {
        "description": "AMERICAN AIRLINES GROUP INC",
        "displaySymbol": "AAL",
        "symbol": "AAL"
    },
    {
        "description": "ALTISOURCE ASSET MANAGEMENT",
        "displaySymbol": "AAMC",
        "symbol": "AAMC"
    },
    {
        "description": "ATLANTIC AMERICAN CORP",
        "displaySymbol": "AAME",
        "symbol": "AAME"
    },
    {
        "description": "AARON'S INC",
        "displaySymbol": "AAN",
        "symbol": "AAN"
    },
  ];
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