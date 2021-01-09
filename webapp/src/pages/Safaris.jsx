import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import Table from './Table';


const Safaris = () => {
    const [message, setMessage] = useState('Hi there, how are you?');
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    
    const data = [
        {
          Name: "Anssam",
          Age: "20"
        },
        {
          Name: "Rihab",
          Age: "12"
        },
        {
          Name: "Amir",
          Age: "3"
        }
    ];

    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    useEffect(() => {
        axios.get('/api/safaris').then(response => {
          console.log(response);
          setSafaris(response.data);
        }).catch(err => {
        console.log(err);
      });
    }, []);

    return (
      <div className="Safaris">
         <h1>{message}</h1> 
         <h1>Hello StackBlitz!</h1>

         <Table data={data}/>

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