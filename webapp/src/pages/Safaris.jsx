import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Card from './Card';

const Safaris = () => {
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
          description: safari.description,
          price: safari.price
        });
    });
    
    console.log(array_nodes);

    return (
      <Card title="Safaris" text="Safari Zote">
        <div className ="sTable">
          {array_nodes && array_nodes.length > 0 
          ? <Table data={array_nodes}/> 
          : <p>fUCK!!</p>}
        </div>
      </Card>
    );
  };

  export default Safaris;