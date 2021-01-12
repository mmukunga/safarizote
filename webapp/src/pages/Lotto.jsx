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
        <ul className="Rekke">
          {data.map(rekke => 
            <li key={rekke.id}>{rekke.pos}
              <ul className="RadTall">
                   {rekke.rad.map((trekk, idx) => <li key={idx}>{trekk}</li>)}
              </ul>
            </li>
          )}
        </ul>
      </Card>    
    )
}

export default Customer