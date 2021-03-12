import React from 'react';
import gettyimages from '../gettyimages.jpg';

const Card = (props) => {

  const { cardWidth, fontColor, backgroundColor, children, imageUrl } = props;
  const style = {
    width: cardWidth,
    backgroundColor: backgroundColor,
    color: fontColor,
    borderRadius: 10,
    margin: '10px auto',
    padding: '1px',
    border: cardWidth == '650px' ? '4px solid #a30319' : '4px solid #90DFF5',
    boxShadow: '0 0 10px 5p'
  };

  const labelStyles = {color: fontColor};
  const imageStyles = {backgroundImage: `url(${imageUrl})`};

  console.log('1.imageUrl');
  console.log(imageUrl);
  console.log('2.imageUrl');
  console.log(imageStyles);
  console.log('3.imageStyles');

  return (
    <div style={style}>
      <div style={cardWidth=='650px' ? labelStyles : imageStyles}>
        {children}
      </div>
    </div>
  )
}

export default Card;