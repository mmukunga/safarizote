import React, { useState } from 'react';
import Bookings from './Bookings';


const Safaris = () => {
    const [count, setCount] = React.useState(0);
    const handleChange = (newValue) => {
        setCount(count + newValue);
    }

// We pass a callback to Child
    return ( 
    <div>
        <h2>Count {count}</h2>
        (Count should be updated from child)
        <Bookings count={count} onChange={handleChange}/>
    </div>
    );
}

export default Safaris;