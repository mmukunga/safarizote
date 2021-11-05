import React, { useState } from 'react';
import CustomContext from './CustomContext';
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

  const bookingsReducer = (state, action) => {
    switch (action.type) {
      case 'INIT_BOOKING': {
        console.log(action);
        if (action.payload.type === "checkbox") {
          return {
            ...state,
          [action.payload.name]: action.payload.checked
          }
        }
        const {name, value} = action.payload;
        console.log(action.payload);
        return {
          ...state,
          [name]: value,
        };
      }
      case 'ADD_TOUR': {
        console.log(action);
        const nextId = state.nextId + 1;
        const {name, value} = action.payload;
        console.log(action.payload);
        return {
          nextId,
          tours: [...state.tours, { nextId: nextId, [name]: value }],
        };
      }
      case 'REMOVE_TOUR': {
        const nextId = state.nextId;
        const result = state.tours.filter((tour) => tour.nextId !== action.payload);
        return {
          nextId,
          tours: [...result],
        };
      }
      default:
        return state;
    }
  };

const Safaris = () => {
    const [name, setName] = React.useState('');
    const [state, dispatch ] = React.useReducer(bookingsReducer, initialState);
    const providerState = { state, dispatch };
/*
    const onChange = (el) => {
        const {name, value} = el.target;
        console.log(name + ': ' + value);
        setName(value);
    }
*/
    return ( 
    <CustomContext.Provider value={providerState}>
        <h2>Count {name}</h2>
        (Count should be updated from child)
        <Bookings/>
    </CustomContext.Provider>
    );
}

export default Safaris;