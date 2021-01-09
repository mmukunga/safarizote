import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import Table from './Table';


const Safaris = () => {
    const [message, setMessage] = useState('Hi there, how are you?');
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    
    const data = [
     {id: 6, name: "Jack Maji Moto Smith", email: "m@gmail.com", phone: "415 22 386", address: "21 Jump street", dateCreated: "2021-01-08T12:48:27.001123Z"},
     {id: 7, name: "Adam Moto Wake", email: "maji@gmail.com", phone: "915 22 111", address: "Grefsen Platåen", dateCreated: "2021-01-08T12:48:27.001123Z"},
     {id: 8, name: "Johnson Katana Ndovu", email: "moto@hotmail.com", phone: "222 22 222", address: "Maridalsveien", dateCreated: "2021-01-08T12:48:27.001123Z"},
     {id: 9, name: "Peter Ngara Mwendwa", email: "kazi@online.no", phone: "911 22 911", address: "Number 10", dateCreated: "2021-01-08T12:48:27.001123Z"},
     {id: 10, name: "Masinde Murilo David", email: "sverige@kora.se", phone: "+44 510 22 777", address: "Downings Street", dateCreated: "2021-01-08T12:48:27.001123Z"}
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