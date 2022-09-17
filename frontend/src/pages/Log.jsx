import React from 'react';
import Card from "./Card";

const Log = (props) => {
  var parse = require('html-react-parser');
  const { data, addToCart } = props;
  console.log(data);
return (
  <Card key={data.id} title={data.path} className="Card">
      {parse(data.error)}
      <a href="#" onClick={addToCart.bind(this, data)} className="LogItem">
        Delete Log {`$`}{data.id} {data.path}
      </a>
  </Card>
);
}
export default Log;