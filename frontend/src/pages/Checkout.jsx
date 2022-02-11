import axios from "axios";
import React from "react";
import { useCart } from "./CartContext";

const Checkout = (props) => {
    const { onClose, show } = props;
    const { cart } = useCart();

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    const checkout = async () => {    
     return await axios.post('/api/checkout', cart);
    };

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button onClick={onClose}>close</button>
          <form> 
            <label htmlFor="name">Name:</label>
            <input name="name" placeholder="Full name"/> 
            <label htmlFor="phone">Phone:</label>
            <input type="phone" id="phone" name="phone" 
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>   
            <label htmlFor="email">Email:</label>
            <input id="email-input" type="email" name="email"/>               
            <button type="button" onClick={checkout}>Checkout</button>                 
         </form> 
        </section>
      </div>
    );
  };

export default Checkout;