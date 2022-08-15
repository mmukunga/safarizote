
import React from "react";
import axios from "axios";
import { 
    CardElement, 
    useStripe, 
    useElements 
} from "@stripe/react-stripe-js";

const PaymentForm = ({totalSum, quantity}) => {
  const [payment, setPayment] = React.useState(false);  
  const stripe   = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
    return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    if (!error) {
      const payload = {
          token: token.id, 
          currency: 'EGP', 
          amount: totalSum
      };
      axios.post("/api/payment/charge", payload).then((resp) => {
         console.log(resp);
      }).catch((err) => {
         console.log(err);
      });
    } else {
      console.log(error);
    }
  };

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#303238',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: "#CFD7DF",
        },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };
    
  return (
    <form onSubmit={handleSubmit} className='StripeElement'>
      <div className="product-info">
        { totalSum != 0 ? `Qty: ${quantity} &nbsp; Price: ${totalSum}` : '' }
      </div>
      <CardElement options={CARD_OPTIONS}/> 
      <button disabled={!stripe} className="btn-pay">PAY NOW</button>
    </form>
  );
};

export default PaymentForm;