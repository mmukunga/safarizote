import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Safaris = () => {
    const [message, setMessage] = useState('Hi there, how are you?');
    const [safaris, setSafaris] = useState([]);

    useEffect(() => {
        axios.get('/api/safaris')
            .then(res => setSafaris(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
      <div className="Safaris">
         <h1>{message}</h1> 
         <ul>
         { safaris.map(item => <li key={item._id}>{item.title}</li>) }
         </ul>
      </div>
    );
  };

  export default Safaris;