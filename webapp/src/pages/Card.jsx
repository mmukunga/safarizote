import React from 'react';
 
const Card = (props) => {

  const { cardWidth, fontColor, backgroundColor, children } = props;
  const style = {
    width: cardWidth,
    backgroundColor: backgroundColor,
    color: fontColor,
    borderRadius: 10,
    margin: '10px auto',
    padding: '5px',
    border: '2px solid #f8ecd5',
    boxShadow: '0 0 10px 5p',
    backgroundColor:'#F0FFFF' 
  };

  const labelStyles = { color: fontColor };
 
    return (
      <div style={style}>   
           <div style={labelStyles}>
               { children }
            </div>
      </div>
    )
}
 
export default Card;