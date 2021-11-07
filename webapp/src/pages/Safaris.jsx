import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import CustomContext from './CustomContext';
import Bookings from './Bookings';

const initialState = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    date: '',
    address: '',
    adults: '',
    children: '',
    message: '',
    tours: [{id: 0, safariId:'0123210' }],
  };

  const bookingsReducer = (state, action) => {
    switch (action.type) {
      case 'INIT_BOOKING': {
        if (action.payload.type === "checkbox") {
          return {
            ...state,
          [action.payload.name]: action.payload.checked
          }
        }
        const {name, value} = action.payload;
        return {
          ...state,
          [name]: value,
        };
      }
      case 'ADD_TOUR': {
        const id = state.id + 1;
        const { name, value } = action.payload;
        return {
          ...state,
          tours: [...state.tours, { id: id, [name]: value }],
        };
      }
      case 'REMOVE_TOUR': {
        const id = state.id;
        const result = state.tours.filter((tour) => tour.id !== action.payload);
        return {
          ...state,
          tours: [...result],
        };
      }
      default:
        return state;
    }
  };

const Safaris = () => {
    const [name, setName] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [numberOfHits, setNumberOfHits] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(2);
    const [state, dispatch ] = React.useReducer(bookingsReducer, initialState);
    const providerState = { state, dispatch };
    React.useEffect(() => {
      axios.get('/api/safaris').then(response => {
        setProducts(response.data);
        const productsArray = products.map((safari) => [safari.hostname, safari.org]);
        var result = [];
        productsArray.reduce((res, value) => {
          if (!res[value.hostname]) {
            res[value.hostname] = { Hostname: value.hostname, Org: value.org, qty: 0 };
            result.push(res[value.hostname])
          }
          res[value.hostname].qty += 1;
          return res;
        }, {});

      }).catch(err => {
      console.log(err);
    });
  }, []);

  var catalog = [];

  const handleClickPage = (event) => {
    setCurrentPage(event.target.id);
  }

  products.forEach((safari) => {
      catalog.push({
        id: safari.id,
        title: safari.title,
        summary: safari.summary,
        details: safari.details + ' <p>USD ' + safari.price + '<p>',
      });
  });
  
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = catalog.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(catalog.length / pageSize); i++) {
    pageNumbers.push(i);
  }
  
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li className="CssLink"
        key={number}
        id={number}
        onClick={handleClickPage}>
        {number}
      </li>
    );
  });

  return ( 
      <CustomContext.Provider value={providerState}>
        <Card className="InnerCard" fontColor="black">    
        <ul id="page-numbers"> 
          <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Our Safaris:</span></li> 
              {renderPageNumbers}
          </ul> 
            <Bookings/>
            <div className="BookingInfo">
              <ul className="BookingDetails">
                <li>Name: {state.name}</li>
                <li>Email: {state.email}</li>
                <li>Phone: {state.phone}</li>
                <li>Arrival Date: {state.date}</li>
                <li>Address: {state.address}</li>
                <li>Number of Adults: {state.adults}</li>
                <li>Number of Children:{state.children}</li>
                <li>Message: {state.message}</li>
              </ul>
            </div>
            {state.tours.map((tour, index) => (
                <p key={index}>Safari {tour.id} Tour Id: {tour.safariId} 
                 <button style={{width:'10%'}} onClick={() => dispatch({ type: 'REMOVE_TOUR', id })}>X</button></p>
            ))}
          </Card>  
      </CustomContext.Provider>   
  );
}

export default Safaris;