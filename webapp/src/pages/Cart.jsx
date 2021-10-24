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

  const modalCart = props.show && ( <div className='overlay'>
  <div className='popUp'>  
    <div class="pHeader">
      <div class="pChild"><span className="SafariTitle">Cart</span>     
          For reservation and enquires - Send us a 
        </div>
      <div class="pCloseMe"><a href="#" onClick={props.handleShow}>X</a></div>
    </div>        
    <div class="popUp-content">
         content HERE {props.children}
         {props.cart.length > 0 ? props.cart.map((item) => <div key={item.id}>{item.id} {item.title}</div>): 'No items in Cart'
          }
    </div>
  </div>
</div> );

  console.log('!!modalCart!! ' + modalCart);

  return ReactDOM.createPortal(modalCart, document.getElementById("portal"));
}

export default Cart;