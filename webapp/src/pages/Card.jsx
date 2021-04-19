import React from 'react';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = {
    color: fontColor,
    fontFamily: 'Courier New, monospace',
    fontSize:'12px'
  };

  return (
    <div className={className}>
      <div style={labelStyles}>
        {children}
      </div>
    </div>
  )
}

export default Card;