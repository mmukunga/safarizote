import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Home = () => {
   const [data, setData] = useState([]);
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
          setData(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, [clientInfo]);


    const counts = data.map(dataItem => ({
        type: dataItem.url,
        count: data.filter(item => item.url === dataItem.url).length
    }));

    console.log(counts);


    return (
        <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
            <p>People also ask about this:</p>
            <ul>
               <li>How much does a safari cost in Kenya?</li>
               <li>What is the best safari in Kenya?</li>
               <li>What is the best time to go on safari in Kenya?</li>
               <li>Is Kenya safe for Safari?</li>
            </ul>
            <ul className="vList">          
                { data.map(item => <li key={item.id}>Link: {item.url} Browser: {item.browser}</li>) }
            </ul>
            <p>Number of Hits: { data.length }</p>
        </Card>
    )
}

export default Home