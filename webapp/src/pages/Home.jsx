import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Home = () => {
    const [data, setData] = useState([]);
    const [clientInfo, setClientInfo] = useState({})
    
   useEffect(() => {
      axios.get('https://extreme-ip-lookup.com/json/')
        .then(response => {
            console.log(response);
            setClientInfo(response.data);
        }).catch(e => {
            console.log(e);
        })
    }, []);

    useEffect(() => {
        axios.get('/api/allHits').then(response => {
          console.log(response);
          setData(response.data);
        }).catch(err => {
        console.log(err);
      });
    }, [clientInfo]);

    return (
        <Card title="Home" text="The Home - Sipili!!">
            <ul className="vList">          
                { data.map(item => <li key={item.id}>Link: {item.url} Browser: {item.browser}</li>) }
            </ul>
        </Card>
    )
}

export default Home