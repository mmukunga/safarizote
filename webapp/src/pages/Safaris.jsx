import React, { useState } from 'react';
import Bookings from './Bookings';


const initialState = {
    nextId: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    adults: '',
    children: '',
    message: '',
    tours: [{nextId: 0, title:'Masaai Mara' }],
  };

const Safaris = () => {
    const [name, setName] = React.useState('');
    const handleChange = (newValue) => {
        console.log(newValue);
        //setName(newValue);
    }

// We pass a callback to Child
    return ( 
    <div>
        <h2>Count {name}</h2>
        (Count should be updated from child)
        <Bookings initialState={initialState} onChange={handleChange}/>
    </div>
    );
}

export default Safaris;