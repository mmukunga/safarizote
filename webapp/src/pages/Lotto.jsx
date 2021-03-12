import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Lotto = () => {
    const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await axios.get('/api/tipping');
          setData(result.data);
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
  },[]);

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF" imageUrl="../images/tourists.jpg">
        <p>Lotto Kupong!!</p>
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

export default Lotto