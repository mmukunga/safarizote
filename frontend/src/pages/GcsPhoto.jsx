import React from 'react';
import Card from "./Card";

const GcsPhoto = (props) => {
  var parse = require('html-react-parser');
  const { data, addToCart } = props;
  const { id, title, image, body } = data;
return (
  <Card key={data.key} className="Card" >
      {props.data}
  </Card>
);
}
export default GcsPhoto;