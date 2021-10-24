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
    <ul>
      {cart.map((item) =>
        <li key={item.id}>{item.title} {item.price} <button type="button" onClick={() => removeFromCart(item)}>Remove from cart</button></li>
      )}
    </ul>
    {!cart.length && <span>No items in cart.</span>}
    {cart.length && <form onSubmit={handleSubmit}><button type="submit">Send Us a Booking</button></form>}
  </div>
  )};


export default Cart;