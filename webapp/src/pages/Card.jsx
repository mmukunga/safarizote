import React from 'react';
import gettyimages from '../gettyimages.jpg';

const Card = (props) => {

  const { cardWidth, fontColor, backgroundColor, children } = props;
  const style = {
    width: cardWidth,
    backgroundColor: backgroundColor,
    color: fontColor,
    backgroundImage:`url(${gettyimages})`,
    backgroundSize: 'contain',
    backgroundSize: 'cover',
    borderRadius: 10,
    margin: '10px auto',
    padding: '1px',
    border: cardWidth == '650px' ? '4px solid #a30319' : '4px solid #90DFF5',
    boxShadow: '0 0 10px 5p'
  };

  const labelStyles = { color: fontColor };

  return (
    <div style={style}>
      <div style={labelStyles}>
        {children}
      </div>
    </div>
  )
}

export default Card;