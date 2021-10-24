import React from 'react';

const Cart = (props) => {
  
  if (!props.open) { 
    return null;
  }
   
  const modal = props.open && (
    <div className='overlay'>
       <div className='popUp'>  
         <div class="pHeader">
           <div class="pChild"><span className="SafariTitle">Cart</span>     
               For reservation and enquires - Send us a 
               <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">Message or E-Mail</NavLink>
             </div>
           <div class="pCloseMe"><a href="#" onClick={props.handleClose}>X</a></div>
         </div>        
         <div class="popUp-content">
         <ul>
            {props.cart.map((item) =>
              <li key={item.id}>{item.title} {item.price} <button type="button" onClick={() => props.removeFromCart(item)}>Remove from cart</button></li>
            )}
          </ul>
          {!props.cart.length && <span>No items in cart.</span>}
         </div>
       </div>
     </div>
   );

  return ReactDOM.createPortal(modal, document.getElementById("portal"));
}

export default Cart;