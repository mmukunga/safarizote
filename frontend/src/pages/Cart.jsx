import React, { useContext } from "react";
import Card from './Card';
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeItem } = useCart();
  const totalPrice = cart && cart.items.reduce((acc, curr) => acc + curr.price, 0);

  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }
  
  const deleteItem = (item) => {
    removeItem(item);
  };
 
  return (
    <Card className="Safaris" styleProps={{width:'98%'}} title="Safari Tours">
    <div className="container">
      <span>items in cart: {cart.items.length} </span>
      <span>total price: {formatPrice(totalPrice)}</span>
      {
      cart.items.map((el, idx) => (
        <div key={idx} className="row cart-row">
          <div className="col-75">
            {`${el.title}`} {`${el.quantiy}`} {`kr.${el.price}`}
          </div>
          <div className="col-25">
              <input type="submit" value="remove" onClick={() => deleteItem(el)}/>
          </div>
        </div>
      ))
      }
    </div>
    </Card>
  );
}
