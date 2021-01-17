import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Shopping = () => {
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
        <div className="Rekke">
          {data.map(rekke => 
            <div key={rekke.id}>
              <ul className="Lotto">
                 <li>{rekke.pos}</li>{rekke.rad.map((trekk, idx) => <li key={idx}>{trekk}</li>)}
              </ul>
            </div>
          )}
        </div>
      </Card>    
    )
}

export default Shopping