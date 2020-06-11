import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, FlatList, Button } from 'react-native'
import Axios from "axios"

function Item({ title }) {
  return (
    <Button title={title}/>
  );
}

export default function NewsScreen() {
  const [ news, setNews ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("https://finnhub.io/api/v1/news", {
        params: {
          token: process.env.FINNHUB_KEY, 
          category: "general", 
        }
      })
 
      setNews(result.data);
      console.log("news");
    };
 
    fetchData();
  }, [])
  
  return (
    <SafeAreaView>
      <FlatList
        data={news}
        renderItem={({ item }) => <Item title={item.headline} />}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  );
}