import React, { useEffect, useState } from 'react';
import { Text, SectionList, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import Axios from "axios";

import { setCompany } from '../actions';
import { useNavigation } from '@react-navigation/native';

const Symbol = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const Card = styled.View`
  width: 100px;
  height: 70px;
  margin: 5px;
  border-radius: 10px;
  background: #FFF;
`;
function IndexItem({ symbol, description }) {
  const BASE_URL = useSelector(state => state.BASE_URL);
  const API_KEY = useSelector(state => state.API_KEY);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [ quote, setQuote ] = useState({ "c": 0, "h": 0, "l": 0, "o": 0, "pc": 0, "t": 0 });
  const [ change, setChange ] = useState(0);
  const [ p_change, setP_change ] = useState(0);
  const [ indicator, setIndicator ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`${BASE_URL}/quote`, {
        params: {
          token: API_KEY, 
          symbol: symbol
        }
      }).then((res) => { return res })
      .catch(() => { return [] })
 
      await setQuote(result.data);
      
      console.log(symbol);
    };
 
    fetchData();

    setChange((quote.c - quote.pc).toFixed(2));
    setP_change(((change/quote.pc) * 100).toFixed(2));
    if(change>=0) {
      setIndicator("#00F");
    } else {
      setIndicator("#F00");
    }
  }, []);
  
  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('Company', { symbol: symbol }); dispatch(setCompany(symbol)); }}>
      <Card>
        <Symbol numberOfLines={1}>{description}</Symbol>
        <Text>{quote.c}</Text>
        <Text style={{color: indicator}}>{p_change}%</Text>
      </Card>
    </TouchableOpacity>
  );
}

export default function Indices({ navigation }) {
  const usIndices = useSelector(state => state.symbols.indices.slice(0, 3));
  const eurIndices = useSelector(state => state.symbols.indices.slice(7, 10));
  const asiaIndices = useSelector(state => state.symbols.indices.slice(14, 17));

  return (
    <SectionList
      sections={[
        { data: usIndices }, 
        { data: eurIndices }, 
        { data: asiaIndices }, ]}
      keyExtractor={(item) => `${item.symbol}` }
      renderItem={({ item }) => <IndexItem symbol={item.symbol} description={item.description} navigation={navigation}/>}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
}