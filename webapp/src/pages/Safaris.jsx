import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';


const Safaris = () => {
    const [message, setMessage] = useState('Hi there, how are you?');
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    
    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    useEffect(() => {
        axios.get('/api/safaris').then(res => {
          console.log(res);
          setSafaris(res.data);
        }
      ).catch(err => {
        console.log(err);
      });
    }, []);

    return (
      <div className="Safaris">
         <h1>{message}</h1> 
         <div className="List">
          <List listName="Safaris" list={safaris} handleCheck={handleChecked}/>
        </div>
         <ul>
         { safaris.map(item => <li key={item._id}>{item.title}</li>) }
         </ul>
      </div>
    );
  };

  export default Safaris;