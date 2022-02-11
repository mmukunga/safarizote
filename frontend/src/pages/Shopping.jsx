import React from 'react';
import PropTypes from 'prop-types';
const Shopping = ({ shopping }) => {
  return (
    <div key={shopping.id} className="row">
      <div className="col-75">
        <div className="child">{`${shopping.product}`}</div>
        <div className="child">{`${shopping.shop}`}</div>
      </div>
      <div className="col-25">
        <div className="child">{`kr.${shopping.price}`}</div> 
      </div> 
    </div>
  );
};

Shopping.propTypes = {
  shopping: PropTypes.shape(Object),
};

export default Shopping;
