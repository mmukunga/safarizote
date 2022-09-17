import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {SafariContext} from "./SafariContext";
import Card from "./Card";
import { Button } from './Components';
import Emoji from "./Emoji";
import PaymentForm from "./PaymentForm";

const Cart = props => {
  const context = useContext(SafariContext);
  const [totalSum, setTotalSum] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [error, setError] = React.useState(Error());
  
  const pk_test = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  const [stripePromise, setStripePromise] = React.useState(() => loadStripe(pk_test));

  console.log(props);

  useEffect(() => {
    console.log(context);
    context.cart.map((cartItem) => {setTotalSum((total) =>total + cartItem.price)});
    context.cart.map((cartItem) => {setQuantity((qty) =>qty + cartItem.quantity)});
  }, [context]);

  return (
    <React.Fragment>
      <Card className="Card">
        {context.cart.length > 0? (
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
                    <Button label="Send" className="btn" handleClick={context.removeFromCart.bind(this, cartItem.id)}>
                      {<Emoji label="Remove" />}
                    </Button></div>
                </div>              
              )}
            )}
            <Elements stripe={stripePromise}>
              <PaymentForm totalSum={totalSum} quantity={quantity}/> 
            </Elements>  
          </div>
        ) : (           
          <Link to='/stripes' className="cartLink">
             <Emoji label="Coffee"/> 
          </Link>          
        )
        }

        <p style={{ color: "red", textAlign:'left' }}>{error.message}</p>
      </Card>
    </React.Fragment>
  );
};

export default Cart