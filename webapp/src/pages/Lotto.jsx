import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Customer = () => {
    const [data, setData] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await axios.get('/api/tipping');
          console.log(result);
          setData(result.data);
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
  },[]);

    return (
      <Card title="Lotto Kupong" text="Tipping i Lotto">
        <ul>
            {data.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </Card>    
    )
}

export default Customer