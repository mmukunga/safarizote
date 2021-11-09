import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  const cart = props.cart;

  if (!props.show) { 
    return null;
  }

  const modalCart = props.show && ( 
  <div className='overlay'>
    <div className='popUp'>  
        <div className="pHeader">
          <div className="pChild">
            <span className="SafariTitle">For enquiries - Please Send us an 
            <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">E-Mail</NavLink></span>
          </div>
          <div className="pCloseMe"><a href="#" onClick={props.handleShow}>&#x274C;</a></div>
        </div>        
        <div className="popUp-content">
        <ul className="CartList">  
        {props.cart.length > 0 ? 
            cart.map((booking) => <li key={booking.safariId}>{booking.safariId} {booking.name} {booking.email} {booking.phone} <input type="button" value="🗑️" onClick={() => props.removeFromCart(booking)}/></li>)
            : <li>No items in Cart</li>}
        </ul>
        </div>
      </div>
    </div> 
  );


  return ReactDOM.createPortal(modalCart, document.getElementById('modal_root'));
}

export default Cart;