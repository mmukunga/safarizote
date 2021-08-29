import React from 'react';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = {
    fontSize: '2.5vw',
    margin: '2px',
    padding: '2px',
    border: '2px solid red'
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