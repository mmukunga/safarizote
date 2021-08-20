import React from 'react';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = {
    fontFamily: 'Courier New, monospace',
    fontSize: '13px',
    
    margin: '2px',
    padding: '2px'
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