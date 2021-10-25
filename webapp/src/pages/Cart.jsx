import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  
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
        <div class="popUp-content">
        {props.cart.length > 0 ? 
            props.cart.map((item) => <div key={item.id}>{item.title} <input type="button" value="Delete" onClick={() => props.removeFromCart(item)}/></div>)
            : 'No items in Cart'}
        </div>
      </div>
    </div> 
  );


  return ReactDOM.createPortal(modalCart, document.getElementById('cart_portal'));
}

export default Cart;