import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  
  console.log(props);
/*
  if (!props.show) { 
    console.log('SHOW!! ' + props.show);
    return null;
  }
*/

  console.log('!!SHOW TRUE!! ' + props.show);

  return ReactDOM.createPortal(
    <div>
        Modal content goes here
    </div>,
    document.getElementById('cart_portal')
)
}

export default Cart;