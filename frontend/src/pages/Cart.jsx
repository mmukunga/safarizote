import React, { useContext, useEffect } from "react";
import {SafariContext} from "./SafariContext";
import Card from "./Card";
import { Button } from './Components';

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
          {context.cart.map(cartItem => {
            const data = `${cartItem.title} Price: ${cartItem.price} Quantity: ${cartItem.quantity}`;
            return (
              <div className="tr cartRow" key={cartItem.id}>                                  
                  {<div dangerouslySetInnerHTML={{__html: data}} className="td"/>}
                  <Button label="Send" className="td btn" handleClick={context.removeFromCart.bind(this,cartItem.id)}>
                    Remove from Cart
                  </Button>
              </div>
            )}
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Cart