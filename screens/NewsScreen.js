import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Button, RefreshControl, Text, Linking  } from 'react-native'

import Axios from "axios"
import styled from 'styled-components';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const NewsImg = styled.Image`
  border-radius: 10px;
  flex: 0.3
  margin: 10px;
`;
const HeadLine = styled.Text`
  flex: 0.5;
  font-weight: bold;
  font-size: 15px;
`;
const RightView = styled.View`
  flex: 0.7;
  flex-direction: column;
  justify-content: center;
`;
const Card = styled.View`
  display: flex;
  flex-direction: row;
  height: 140px;
  margin: 5px;
  border-radius: 10px;
`;
function Item({ headline, image, datetime, url, source }) {
  const publishedAt = `${new Date(datetime * 1000).toISOString().slice(0,16)}`;
  
  return (
    <Card>
      <NewsImg
        source={{ uri: image }}
      />
      <RightView>
        <HeadLine 
          numberOfLines={2} 
          ellipsizeMode="tail">
          {headline}
        </HeadLine>
        <Text
          style={{ flex: 0.2 }}>
          published by {source}
        </Text>
        <Text
          style={{ flex: 0.2 }}>
          {publishedAt.split('T')[0] + " " + publishedAt.split('T')[1]}
        </Text>
        <Button 
          style={{ flex: 0.1 }}
          title="Read More"
          onPress={() => {Linking.openURL(url)}}/>
      </RightView>
    </Card>
  );
}

export default function NewsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const [ news, setNews ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("https://finnhub.io/api/v1/news", {
        params: {
          token: "", 
          category: "general", 
        }
      }).then((res) => { return res })
      .catch(() => { return [] })
 
      setNews(result.data);
      console.log("news");
    };
 
    fetchData();
  }, [refreshing])
  
  return (
    <SafeAreaView>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={news}
        renderItem={({ item }) => <Item headline={item.headline} image={item.image} datetime={item.datetime} url={item.url} source={item.source} />}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  );
}