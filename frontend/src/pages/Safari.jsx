import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { useCart } from "./CartContext";

const Safari = (props) => {
  const { cart, addToCart } = useCart();
  const { data } = props;

  const cartHandler = () =>{
    const booking = { ...data, quantity: 1 };
    addToCart(booking);
  }
  
  return (
    <Card className="safari" styleProps={{width:'48%'}} title="Safari">
    <div className="container"> 
    <button className="cartButton" onClick={cartHandler}>Add to Cart</button>
     <div><img src={data.image} alt={data.title}/></div>
       <div className="safariDesc">
          <div data-testid="title">{data.title}</div>
          <div data-testid="price">${data.price.toFixed(3)}</div>
       </div>
       </div>    
    </Card>
  );
};

Safari.propTypes = {
  safari: PropTypes.shape(Object),
};

export default Safari;