import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import Table from './Table';


const Safaris = () => {
    const [message, setMessage] = useState('Hi there, how are you?');
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    const [headers, setHeaders] = useState([]);
    
    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    useEffect(() => {
        axios.get('/api/safaris').then(res => {
          console.log(res);
          setSafaris(res.data);
          console.logs(res.data[0]);
          console.logs(Object.keys(res.data[0]));
        }
      ).catch(err => {
        console.log(err);
      });
    }, []);

    return (
      <div className="Safaris">
         <h1>{message}</h1> 
         <h1>Hello StackBlitz!</h1>
         <div className="List">
          <List listName="Safaris" list={safaris} handleCheck={handleChecked}/>
        </div>
         <ul>
         { safaris.map(item => <li key={item.id}>{item.title}</li>) }
         </ul>
      </div>
    );
  };

  export default Safaris;