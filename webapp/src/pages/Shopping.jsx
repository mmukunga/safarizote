import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const initialState = {
    store: 'Joka',
    product: "Maji Waters",
    price: 0.0,
    quantity: 0.0,
    name:'Mkunsim',
    dateCreated: new Date()
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'SHOPPING_UPDATE':
            const {name, value} = action.payload;
            return {...state, [name]: value};
        default:
            return state;
    }
}

const Shopping = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [data, setData] = useState([]);
  const [posted, setPosted] = useState(false);

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
  },[posted]);

  const handleChange = (event) => {
      dispatch({type: 'SHOPPING_UPDATE', payload: event.target})
  }
   
  const handleSubmit = (e) => {
      e.preventDefault();
      const shopping = { ...state };
      console.log(shopping);

      axios.post('/api/newShopping', shopping)
      .then(response => {
        console.log(response);
        setPosted(true);
      });
  }

    return (
      <Card className="InnerCard" fontColor="black">
        <p>Shoppings!!</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="row">
            <div className="leftColumn"> 
              Store
              <input type="text" id="store" placeholder="Store" onChange={handleChange}/>
            </div>
            <div className="rightColumn"> 
              Product
              <input type="text" id="product" placeholder="Product" onChange={handleChange}/>
            </div>
          </div>
          <div className="row">
            <div className="leftColumn"> 
              Price
              <input type="text" id="price" placeholder="Price" onChange={handleChange}/>
            </div>
            <div className="rightColumn"> 
              Quantity
              <input type="text" id="quantity" placeholder="Quantity" onChange={handleChange}/>
            </div>
          </div>
          <div className="row">
            <div className="leftColumn"> 
              Customer
              <input type="text" id="name" placeholder="Name" onChange={handleChange}/>
            </div>
            <div className="rightColumn"> 
              Date Createdd
              <input type="text" id="dateCreated" placeholder="Date Createdd" onChange={handleChange}/>
            </div>
          </div>
          <div className="row">
            <button type="submit">Send</button> 
          </div>
        </form> 
        <p>New Shoppings - Registered: {posted? 'true': 'false'}</p>
        <table className="Table">
            <tr>
              <th>Product</th> 
              <th>Price</th>  
              <th>Store</th> 
              <th>Quantity</th> 
              <th>Name</th>  
              <th>DateCreated</th> 
            </tr>
            {data.map(item => {
              var dateCreated = item.dateCreated;
              dateCreated = dateCreated.split('T')[0];
              return (
              <tr key={item.id}>
               <td>{item.product}</td> 
               <td>{item.price}</td>  
               <td>{item.store}</td> 
               <td>{item.quantity}</td> 
               <td>{item.name}</td>  
               <td>{dateCreated}</td> 
              </tr>)}
              )}
        </table>
      </Card>    
    )
}

export default Shopping