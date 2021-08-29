import React from 'react';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = {
    fontSize: '2.5vw',
    margin: '2px',
    padding: '2px',
    border: '2px solid red',
    '@media (max-width: 600px)': {
        backgroundColor: 'green',
        fontSize: '24px'
    }
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

