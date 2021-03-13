import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import gettyimages from '../images/gettyimages.jpg';

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
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF" imageUrl={gettyimages}>
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