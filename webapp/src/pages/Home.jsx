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

    return (
        <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
            <p>Landing Page!</p>
            <ul className="vList">          
                { data.map(item => <li key={item.id}>Link: {item.url} Browser: {item.browser}</li>) }
            </ul>
            <p>Number of Hits: { data.length }</p>
        </Card>
    )
}

export default Home