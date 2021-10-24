import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  
  if (!props.show) { 
    console.log('SHOW!! ' + props.show);
    return null;
  }
   
  const modalCart = props.show && ( <div>CART</div> );

  return ReactDOM.createPortal(modalCart, document.getElementById("portal"));
}

export default Cart;