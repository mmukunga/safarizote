import React from 'react';
import Card from "./Card";

const Safari = (props) => {
  var parse = require('html-react-parser');
  const { data, addToCart } = props;
return (
  <Card key={data.id} image={data.image} title={data.title} className="Card">
      {parse(data.description)} <span className="price">${data.price} {`per person.`}</span> 
      <a href="#" onClick={addToCart.bind(this, data)} className="priceOffer">
        Add to Cart
      </a>
  </Card>
);
}
export default Safari;