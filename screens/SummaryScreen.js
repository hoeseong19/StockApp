import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, ScrollView, View } from 'react-native'
import Axios from "axios";
import styled from "styled-components";

import Stats from "../components/Stats";

const Col = styled.View`
  flex: 0.5;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Desc = styled.Text`
  font-weight: bold
`;
const Box = styled.View`
  backgroundColor: #FFF;
  borderRadius: 10px;
  margin-bottom: 10px;
`;
function KeyStats({ quote }) {
  return (
    <Box>
      <Header>Key Statistics</Header>
      <Row>
        <Col>
          <Desc>Prev Close</Desc>
          <Text>{quote.pc}</Text>
        </Col>
        <Col>
          <Desc>Open</Desc>
          <Text>{quote.o}</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Desc>Low</Desc>
          <Text>{quote.l}</Text>
        </Col>
        <Col>
          <Desc>High</Desc>
          <Text>{quote.h}</Text>
        </Col>
      </Row>
    </Box>
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
  margin: 5px;
`;
export default function SummaryScreen({ route }) {
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
        <KeyStats quote={quote}/>
        {(route.params.type === "Company") && <Stats BASE_URL={BASE_URL} API_KEY={API_KEY} symbol={selected.symbol}/>}
      </ScrollView>
    </Body>
  );
}