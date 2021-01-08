import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Safaris = () => {
    const  [customers, setCustomers] =  useState([]);
    console.log('Safaris.jsx');
    useEffect(() => {
      const fetchData = async () => {
        try {
           const result = await axios.get('/api/customers');
           console.log(result);
           setCustomers(result.data);
        } catch (e) {
           console.log(e);
        }
      }
      fetchData();
    },[]);

   return (
      <div>
          <h1 className="title is-1">This is the Home Page</h1>
          <ul>
          {customers.map(customer => 
             <li key={customer.name}>{customer.name}</li>)
          } 
          </ul>
      </div>
      );
   }
export default Safaris;