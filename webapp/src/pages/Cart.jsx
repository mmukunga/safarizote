import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  
  if (!props.show) { 
    console.log('SHOW!! ' + props.show);
    return ReactDOM.createPortal(null, document.getElementById("portal"));
  }
   
  const modalCart = props.show && (
    <div className='overlay'>
       <div className='popUp'>  
         <div class="pHeader">
           <div class="pChild"><span className="SafariTitle">Cart</span>     
               For reservation and enquires - Send us a 
               <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">Message or E-Mail</NavLink>
             </div>
           <div class="pCloseMe"><a href="#" onClick={props.handleShow}>X</a></div>
         </div>        
         <div class="popUp-content">
         content HERE
         </div>
       </div>
     </div>
   );

  return ReactDOM.createPortal(modalCart, document.getElementById("portal"));
}

export default Cart;