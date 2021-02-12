import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Home = () => {
   const [data, setData] = useState([]);
   const [counts, setCounts] = useState([]);
   const [clientInfo, setClientInfo] = useState({});

   useEffect(() => {
      axios.get('https://extreme-ip-lookup.com/json/')
        .then(response => {
            setClientInfo(response.data);
        }).catch(e => {
            console.log(e);
        })
    }, []);

    useEffect(() => {
        axios.get('/api/allHits').then(response => {
          const mediaTypes = data.map(dataItem => dataItem.url) // get all media types
              .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates
          console.log(mediaTypes);

          const counts = mediaTypes.map(dataItem => ({
              id: dataItem.id,
              type: dataItem.url,
              count: response.data.filter(item => item.url === dataItem.url).length
          }));

          console.log(counts);
          setData(response.data);
          setCounts(counts);

        }).catch(err => {
            console.log(err);
        });
    }, [clientInfo]);

    return (
        <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
            <p>People also ask about this:</p>
            <ul className="vList">
               <li>How much does a safari cost in Kenya?</li>
               <li>What is the best safari in Kenya?</li>
               <li>What is the best time to go on safari in Kenya?</li>
               <li>Is Kenya safe for Safari?</li>
            </ul>
            <ul className="vList">          
                { data.map(item => <li key={item.id}>Link: {item.url} Browser: {item.browser}</li>) }
            </ul>
            <ul className="vList">          
                { counts.map(item => <li key={item.id}>Link: {item.type} Browser: {item.count}</li>) }
            </ul>
            <p>Number of Hits: { data.length }</p>
        </Card>
    )
}

export default Home