import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const initialState = {
    store: '',
    product: "",
    price: '',
    quantity: '',
    name:'',
    dateCreated: new Date()
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'SET_SHOPPING':
            const {name, value} = action.payload;
            return {...state, [name]: value};
        default:
            return state;
    }
}

const Shopping = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const handleChange = (event) => {
      dispatch({type: 'SET_SHOPPING', payload: event.target})
  }
  const [data, setData] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await axios.get('/api/shopping');
          setData(result.data);
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
  },[]);

    return (
      <Card title="Shoppings" text="Our Shoppings">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="store">Store</label>
            <input
                type="store"
                name="store"
                placeholder="Store"
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
                type="product"
                name="product"
                placeholder="Product"
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
                type="price"
                name="price"
                placeholder="Store"
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
                type="quantity"
                name="quantity"
                placeholder="Quantity"
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateCreated">Date</label>
            <input
                type="dateCreated"
                name="dateCreated"
                placeholder="Date"
                onChange={handleChange}
                required
            />
          </div>
          <button type="submit">Send</button>  
        </form>
        <ul>
            {data.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </Card>    
    )
}

export default Shopping