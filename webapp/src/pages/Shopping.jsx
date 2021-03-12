import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import gettyimages from '../images/cheeter.jpg';

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
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF"  imageUrl={gettyimages}>
        <p>Shoppings!!</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="row">
            <div className="leftColumn"> 
              <input type="text" id="store" placeholder="Store" onChange={handleChange}/>
            </div>
            <div className="rightColumn"> 
              <input type="text" id="product" placeholder="Product" onChange={handleChange}/>
            </div>
          </div>
          <div className="row">
            <div className="leftColumn"> 
              <input type="text" id="price" placeholder="Price" onChange={handleChange}/>
            </div>
            <div className="rightColumn"> 
              <input type="text" id="quantity" placeholder="Quantity" onChange={handleChange}/>
            </div>
          </div>
          <div className="row">
            <div className="leftColumn"> 
              <input type="text" id="name" placeholder="Name" onChange={handleChange}/>
            </div>
            <div className="rightColumn"> 
              <input type="text" id="dateCreated" placeholder="Date Createdd" onChange={handleChange}/>
            </div>
          </div>
          <div className="row">
            <button type="submit">Send</button> 
          </div>
        </form> 
        <table style={{fontSize: 11, border: '1px solid black', textAlign:'left', borderCollapse: 'collapse'}}>
            <tr>
              <th>Product</th> 
              <th>Price</th>  
              <th>Store</th> 
              <th>Quantity</th> 
              <th>Name</th>  
              <th>DateCreated</th> 
            </tr>
            {data.map(item => {
              return (
              <tr key={item.id}>
               <td>{item.product}</td> 
               <td>{item.price}</td>  
               <td>{item.store}</td> 
               <td>{item.quantity}</td> 
               <td>{item.name}</td>  
               <td>{item.dateCreated}</td> 
              </tr>)}
              )}
        </table>
      </Card>    
    )
}

export default Shopping