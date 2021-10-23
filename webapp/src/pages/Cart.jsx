import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const handleSubmit = async() => {
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append("username", formValue.email)
    loginFormData.append("password", formValue.password)
  
    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "/api/booking",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
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