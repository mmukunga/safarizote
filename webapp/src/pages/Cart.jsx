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
         content HERE
    </div>
  </div>
</div> );

  console.log('!!modalCart!! ' + modalCart);

  return ReactDOM.createPortal('modal', document.getElementById("cart_portal"));
}

export default Cart;