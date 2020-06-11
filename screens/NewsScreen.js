import React from 'react';
import { SafeAreaView, FlatList, Button } from 'react-native'

function Item({ title }) {
  return (
    <Button title={title}/>
  );
}

export default function App() {
  const news = [
    {
        "category": "business",
        "datetime": 1591850520,
        "headline": "Factbox: How ride-hailers around the world are coping with the virus pummeling",
        "id": 4799526,
        "image": "https://s3.reutersmedia.net/resources/r/?m=02&d=20200611&t=2&i=1521860489&w=1200&r=LYNXMPEG5A0AM",
        "related": "",
        "source": "Reuters",
        "summary": "Battered by lockdowns and movement restrictions in the coronavirus pandemic, ride-hailers around the world are cutting jobs and pay, and slashing other costs. In Southeast Asia, the pandemic has raised doubts whether the ride-hailing firms can maintain their promise of improving the lives of millions of poor.",
        "url": "https://www.reuters.com/article/us-health-coronavirus-ridehailing-factbo/factbox-how-ride-hailers-around-the-world-are-coping-with-the-virus-pummeling-idUSKBN23I0HH"
    },
    {
        "category": "company news",
        "datetime": 1591849436,
        "headline": "Indonesia Jan-May oil and gas lifting dips as investment hit -SKK Migas",
        "id": 4798732,
        "image": "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
        "related": "",
        "source": "Reuters",
        "summary": "* Indonesia's upstream oil and gas regulator SKK Migas said\nin a\nstatement on Thursday that the country's oil and gas lifting in\nJanuary to May stood at 701,000 barrels per day (bpd) and 5,658\nmillion cubic feet per day (mmcfd), respectively.",
        "url": "https://www.reuters.com/article/indonesia-oil-production/indonesia-jan-may-oil-and-gas-lifting-dips-as-investment-hit-skk-migas-idUSL4N2DO0V6"
    },
    {
        "category": "business",
        "datetime": 1591849258,
        "headline": "Despite pandemic, new U.S. solar capacity will grow 33% in 2020",
        "id": 4797881,
        "image": "https://s2.reutersmedia.net/resources/r/?m=02&d=20200611&t=2&i=1521858989&w=1200&r=LYNXMPEG5A0AG",
        "related": "",
        "source": "Reuters",
        "summary": "New U.S. solar installations will increase by a third this year, a report published on Thursday showed, as soaring demand by utilities for carbon-free power more than outweighs a dramatic decline in rooftop system orders for homes and businesses due to the coronavirus pandemic.",
        "url": "https://www.reuters.com/article/us-usa-solar-report/despite-pandemic-new-u-s-solar-capacity-will-grow-33-in-2020-idUSKBN23I0HL"
    },
    {
        "category": "top news",
        "datetime": 1591848729,
        "headline": "U.S. pressure could accelerate growth for markets in Greater China",
        "id": 4797114,
        "image": "https://image.cnbcfm.com/api/v1/image/106412032-1582756873616gettyimages-1198368924.jpeg?v=1582756931",
        "related": "",
        "source": "CNBC",
        "summary": "While U.S. authorities put pressure on Chinese assets, investors remain intent on chasing opportunities in the world's second-largest economy.",
        "url": "https://www.cnbc.com/2020/06/11/us-pressure-could-accelerate-growth-for-markets-in-greater-china.html"
    },
  ];
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