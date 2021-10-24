import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  
  console.log(props);

  if (!props.show) { 
    console.log('SHOW!! ' + props.show);
    return null;
  }
  

  console.log('!!SHOW TRUE!! ' + props.show);

  const modalCart = props.show && ( <div>CART</div> );

  console.log('!!modalCart!! ' + modalCart);

  return ReactDOM.createPortal(modalCart, document.getElementById("portal"));
}

export default Cart;