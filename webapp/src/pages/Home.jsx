import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/allHits').then(response => {
          console.log(response);
          setData(response.data);
        }).catch(err => {
        console.log(err);
      });
    }, []);

    console.log(data);

    return (
        <Card title="Home" text="The Home - Sipili!!">
            <div>          
                { data.map(item => <p key={item.id}>Link: {item.url} Browser: {item.browser}</p>) }
            </div>
        </Card>
    )
}

export default Home