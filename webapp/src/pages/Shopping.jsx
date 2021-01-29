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
  const [data, setData] = useState([]);

  const handleChange = (event) => {
      dispatch({type: 'SET_SHOPPING', payload: event.target})
  }
   
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/newShopping', {
        store: state.store,
        product: state.product,
        price: state.price,
        quantity: state.quatity,
        name: state.name,
        dateCreated: state.dateCreated
    }).then(response => {
        console.log(response)
    });
}
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
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group">
            <div class="col-25"> 
                <label htmlFor="store">Store</label>
            </div>
            <div class="col-25"> 
            <input
                type="store"
                name="store"
                placeholder="Store"
                onChange={handleChange}
                required
            />
            </div>
          </div>
          <div className="form-group">
            <div class="col-25"> 
                <label htmlFor="product">Product</label>
            </div>
            <div class="col-25"> 
            <input
                type="product"
                name="product"
                placeholder="Product"
                onChange={handleChange}
                required
            />
            </div>
          </div>
          <div className="form-group">
            <div class="col-25"> 
              <label htmlFor="price">Price</label>
            </div>
            <div class="col-25"> 
            <input
                type="price"
                name="price"
                placeholder="Store"
                onChange={handleChange}
                required
            />
            </div>
          </div>
          <div className="form-group">
            <div class="col-25"> 
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div class="col-25"> 
            <input
                type="quantity"
                name="quantity"
                placeholder="Quantity"
                onChange={handleChange}
                required
            />
            </div>
          </div>
          <div className="form-group">
            <div class="col-25"> 
              <label htmlFor="name">Name</label>
            </div>
            <div class="col-25"> 
              <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  required
              />
            </div>
          </div>
          <div className="form-group">
            <div class="col-25"> 
              <label htmlFor="dateCreated">Date</label>
            </div>
            <div class="col-25">
              <input
                  type="dateCreated"
                  name="dateCreated"
                  placeholder="Date"
                  onChange={handleChange}
                  required
              />
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Send</button> 
          </div> 
        </form>
        <ul>
            {data.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </Card>    
    )
}

export default Shopping