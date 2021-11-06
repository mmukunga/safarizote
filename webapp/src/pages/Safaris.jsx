import React, { useState } from 'react';
import Card from './Card';
import CustomContext from './CustomContext';
import Bookings from './Bookings';

const initialState = {
    nextId: 0,
    name: '',
    email: '',
    phone: '',
    date: '',
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
    <Card className="InnerCard" fontColor="black">  
      <CustomContext.Provider value={providerState}>
      <ul id="page-numbers"> 
         <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Our Safaris:</span></li> 
             {renderPageNumbers}
        </ul> 
          <Bookings/>
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
          {state.tours.map((tour, index) => (
              <p>Hello, {tour.nextId} from {tour.title}!</p>
          ))}
      </CustomContext.Provider>
    </Card>
  );
}

export default Safaris;