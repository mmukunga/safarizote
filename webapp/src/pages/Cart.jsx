import React from 'react';
import axios from 'axios';


const Cart = ({ cart, removeFromCart }) => {
  const handleSubmit = async() => {
    try {
      const response = await axios.post({url: "/api/booking", data: cart,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch(error) {
      console.log(error)
    }
  }
  return (
  <div>
    Cart
    <ul>
      {cart.map((product, index) =>
        <li key={index}>{product.name} {product.price} <button type="button" onClick={() => removeFromCart(index)}>Remove from cart</button></li>
      )}
    </ul>
    {!cart.length && <span>No products in cart.</span>}
    {cart.length && <form onSubmit={handleSubmit}><button type="submit">Send Us a Booking</button></form>}
  </div>
  )};


export default Cart;