import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, FlatList, View, Image, Linking, TouchableHighlight } from 'react-native'
import Axios from "axios";
import styled from "styled-components";
import _ from "lodash";

const Phone = styled.Text`
  color: #00F;
`;
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;
const Box = styled.View`
  backgroundColor: #FFF;
  borderRadius: 10px;
  margin-bottom: 10px;
`;
function Profile({ BASE_URL, API_KEY, symbol }) {
  const [ profile, setProfile ] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`${BASE_URL}/stock/profile2`, {
        params: {
          token: API_KEY, 
          symbol: symbol
        }
      }).then((res) => { return res.data })
      .catch(() => { return [] })
      

      setProfile(result);
      console.log("Profile2");
    };
 
    fetchData();
  }, []);

  return (
    <Box>
      <Header>Profile</Header>
      <Text>{profile.country}</Text>
      <Text>{profile.exchange}</Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDD"
        onPress={() => {Linking.openURL(`tel:${profile.phone}`)}}>
        <Phone>{profile.phone}</Phone>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDD"
        onPress={() => {Linking.openURL(profile.weburl)}}>
        <Phone>{profile.weburl}</Phone>
      </TouchableHighlight>
      <Text>Sector: {profile.finnhubIndustry}</Text>
    </Box>
  )
}

const Body = styled.SafeAreaView`
  margin: 5px;
`;
export default function DetailsScreen() {
  const BASE_URL = useSelector(state => state.BASE_URL); 
  const API_KEY = useSelector(state => state.API_KEY); 
  const selected = useSelector(state => state.selected);

  return (
    <Body>
      <Profile BASE_URL={BASE_URL} API_KEY={API_KEY} symbol={selected.symbol}/>
    </Body>
  );
}