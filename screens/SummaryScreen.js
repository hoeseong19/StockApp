import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, Text, Button } from 'react-native'
import Axios from "axios";
import styled from "styled-components";

const Price = styled.Text`
  font-size: 60px;
  font-weight: bold;
`;
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;
const Body = styled.SafeAreaView`
  margin: 5px 20px;
`;
export default function SummaryScreen({ navigation, route }) {
  const BASE_URL = useSelector(state => state.BASE_URL); 
  const API_KEY = useSelector(state => state.API_KEY); 
  const selected = useSelector(state => state.selected);

  const [ quote, setQuote ] = useState({ "c": 0, "h": 0, "l": 0, "o": 0, "pc": 0, "t": 0 });

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`${BASE_URL}/quote`, {
        params: {
          token: API_KEY, 
          symbol: selected.symbol
        }
      }).then((res) => { return res })
      .catch(() => { return [] })
 
      setQuote(result.data);
      console.log("quote");
    };
 
    fetchData();
  }, []);

  return (
    <Body>
      <Header>{selected.symbol}</Header>
      <Text>{selected.description}</Text>
      <Price>{quote.c}</Price>
    </Body>
  );
}