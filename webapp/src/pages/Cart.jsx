import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  const cart = props.cart;
  console.log(props);

  if (!props.show) { 
    console.log('SHOW!! ' + props.show);
    return null;
  }

  console.log('!!SHOW TRUE!! ' + props.show);

  const modalCart = props.show && ( 
  <div className='overlay'>
    <div className='popUp'>  
        <div class="pHeader">
          <div class="pChild">
            <span className="SafariTitle">For enquiries - Please Send us an 
            <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">E-Mail</NavLink></span>
          </div>
          <div class="pCloseMe"><a href="#" onClick={props.handleShow}>X</a></div>
        </div>        
        <div class="popUp-content" style={{textAlign: 'center'}}>
        <ul className="CartList">  
        {props.cart.length > 0 ? 
            cart.map((booking) => <li key={booking.safariId}>{booking.name} {booking.email} {booking.phone} <input type="button" value="Delete" onClick={() => props.removeFromCart(booking)}/></li>)
            : <li>No items in Cart</li>}
        </ul>
        </div>
      </div>
    </div> 
  );


  return ReactDOM.createPortal(modalCart, document.getElementById('portal'));
}

export default Cart;