import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';

const Safaris = () => {
    const [message, setMessage] = useState('Hi there, how are you?');
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);

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

    console.log(safaris);

    var array_nodes = [];

    safaris.forEach(function(safari) {
      array_nodes.push({
        id: safari.id,
        title: safari.title,
        price: safari.price,
        description: safari.description,
        dateCreated: safari.dateCreated
      });
  });
  
  console.log(array_nodes);

    return (
      <div className="Safaris">
         <h3>Hello StackBlitz!</h3>
         <p>{message}</p> 
          {array_nodes && array_nodes.length > 0 ? <Table data={array_nodes}/> : <p>fUCK!!</p>}
      </div>
    );
  };

  export default Safaris;