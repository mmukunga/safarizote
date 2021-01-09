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
        axios.get('/api/safaris').then(response => {
          console.log(response);
          setSafaris(response.data);
          var headers=[];
          response.data.forEach((data) => {
            console.log(data);
            console.log(data.title);
            headers.push(data.title);
          });
          console.log(headers);
          setHeaders(headers);
        }
      ).catch(err => {
        console.log(err);
      });
    }, []);

    return (
      <div className="Safaris">
         <h1>{message}</h1> 
         <h1>Hello StackBlitz!</h1>
         
         <Table>
        <thead>
           <Table.TR>
             <Table.TH>Name</Table.TH>
             <Table.TH>Age</Table.TH>
           </Table.TR>
        </thead>
        <tbody>
           <Table.TR>
             <Table.TD>Anssam</Table.TD>
             <Table.TD>20</Table.TD>
           </Table.TR>
        </tbody>
      </Table>

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