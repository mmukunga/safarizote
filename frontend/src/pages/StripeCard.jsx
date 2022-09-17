import React, {useMemo} from 'react';
import moment from 'moment';
import {Elements, CardElement, useStripe, useElements} 
from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Card  from "./Card";
import Emoji from "./Emoji";

const PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise =loadStripe(PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [data, setData] = React.useState({
    amount: 100.0,
    currency: "Nok",
    dateCreated: moment("20010704T120854").format(), 
  });
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async () =>{
    if (!stripe || !elements) {
        return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);    
    console.log(error);
    if (!error || elements == undefined) {
      axios.post("/api/payment/charge", {
        token: token.id,
        currency: "Kr.",
        price: 100, 
      }).then((resp) => {
        console.log(resp);
        console.log(data);
        setData({
          amount: resp.data.amount,
          currency: resp.data.currency,
          dateCreated: moment.unix(resp.data.created*1000).format()
        }); 
      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log(error);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#666",
        margin: '10px 0 20px 0',
        "::placeholder": {
          color: "#aa0000",
        },
        fontSize: "20px",
      },
      invalid: {
        color: "#fa755a",
        fontSize: "20px",
      }
    }
  }

  return (
    <div className="stripe-test">
      <ul className="stripe-data">
        <li>Acc: 4242 4242 4242 4242</li>
        <li>Details 01/28 | 123 | 90210</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <button type='submit' className="coffee" disabled={!stripe || !elements}>
          <Emoji label="Coffee"/>
        </button>
      </form>  
      <div>Amount: {data.currency} {data.amount} Date: {data.dateCreated}</div>
    </div>
  );
};

const StripeCard = () => {
  return (
    <Card className="Card" title="StripeCard" >
      <Elements stripe={stripePromise}>
        <CheckoutPage />
      </Elements>
    </Card>
  );
};

export default StripeCard;