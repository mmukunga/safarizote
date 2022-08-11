import React, { useContext, useEffect } from "react";
import {SafariContext} from "./SafariContext";
import Card from "./Card";
import { Button } from './Components';
import Emoji from "./Emoji";

const Cart = props => {
  const context = useContext(SafariContext);

  useEffect(() => {
    /*console.log(context);*/
  }, [context]);

  return (
    <React.Fragment>
      <Card className="Card">
        {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
        <div className="table">
            <div className="th">
              <div className="td">title</div>
              <div className="td">price</div>
              <div className="td">quantity</div>
              <div className="td">+/-</div>
            </div>
          {context.cart.map(cartItem => {
            const data = `${cartItem.title} Price: ${cartItem.price} Quantity: ${cartItem.quantity}`;
            return (
              <div key={cartItem.id} className="tr cartRow">
                <div className="td">{<div dangerouslySetInnerHTML={{__html: `${cartItem.title}`}}/>}</div>  
                <div className="td">{cartItem.price}</div>
                <div className="td">{cartItem.quantity}</div>
                <div className="td">
                  <Button label="Send" className="btn" handleClick={context.removeFromCart.bind(this,cartItem.id)}>
                    {<Emoji label="Remove"/>}
                  </Button></div>
              </div>
              
            )}
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Cart