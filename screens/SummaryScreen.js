import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, Text, Button, FlatList, ScrollView, View } from 'react-native'
import Axios from "axios";
import styled from "styled-components";
import _ from "lodash";

const Desc = styled.Text`
  font-weight: bold
`;
const InlineBody = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
function StatsItem({ item }) {
  const {title, value} = item;

  return (
    <InlineBody>
      <Desc>{title}</Desc>
      <Text>{value}</Text>
    </InlineBody>
  )
}
function Stats({ BASE_URL, API_KEY, symbol}) {
  const [ Metric, setMetric ] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`${BASE_URL}/stock/metric`, {
        params: {
          token: API_KEY, 
          symbol: symbol, 
          metric: "price"
        }
      }).then((res) => { return res.data.metric })
      .catch(() => { return [] })
      
      setMetric(_.flatMap(result, (value, key) => { return { title: key, value: value } }));
      console.log("Metric");
    };
 
    fetchData();
  }, []);

  return (
    <View>
      <Header>Statistics</Header>
      <FlatList
        data={Metric}
        renderItem={({ item }) => <StatsItem item={item}/>}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

const Price = styled.Text`
  font-size: 50px;
  font-weight: bold;
`;
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;
const Body = styled.SafeAreaView`
  margin: 5px 20px;
`;
export default function SummaryScreen() {
  const BASE_URL = useSelector(state => state.BASE_URL); 
  const API_KEY = useSelector(state => state.API_KEY); 
  const selected = useSelector(state => state.selected);

  const [ quote, setQuote ] = useState({ "c": 0, "h": 0, "l": 0, "o": 0, "pc": 0, "t": 0 });
  const [ p_change, setP_change ] = useState(0);
  const [ indicator, setIndicator ] = useState("");
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
  useEffect(() => {
    setP_change((((quote.c - quote.pc)/quote.pc) * 100).toFixed(2));
    if(p_change>=0) {
      setIndicator("#00F");
    } else {
      setIndicator("#F00");
    }
  });

  return (
    <Body>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Header>{selected.symbol}</Header>
        <Text>{selected.description}</Text>
        <Price style={{color: indicator}}>{quote.c.toFixed(2)}({p_change}%)</Price>
        <Stats BASE_URL={BASE_URL} API_KEY={API_KEY} symbol={selected.symbol}/>
      </ScrollView>
    </Body>
  );
}