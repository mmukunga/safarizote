import React from 'react';
import axios from 'axios';


const Cart = ({ cart, removeFromCart }) => {
  const handleSubmit = () => {
    axios.post("/api/booking", { params: { data: cart } }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.error(err);
    });
  }
  return (
  <div>
    Cart
  </div>
  )};


export default Cart;