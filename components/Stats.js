import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native'
import Axios from "axios";
import styled from "styled-components";
import _ from "lodash";

const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;
const Desc = styled.Text`
  font-weight: bold
`;
const InlineBody = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Box = styled.View`
  backgroundColor: #FFF;
  borderRadius: 10px;
  margin-bottom: 10px;
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
export default function Stats({ BASE_URL, API_KEY, symbol }) {
  const [ metric, setMetric ] = useState({});
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
    <Box>
      <Header>Statistics</Header>
      <FlatList
        data={metric}
        renderItem={({ item }) => <StatsItem item={item}/>}
        keyExtractor={item => item.title}/>
    </Box>
  )
}