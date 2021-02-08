import React from 'react';
 
const Card = (props) => {

  const { cardWidth, fontColor, backgroundColor, children } = props;
  const style = {
    width: cardWidth,
    backgroundColor: backgroundColor,
    color: fontColor,
    borderRadius: 10,
    margin: '10px auto',
    padding: '1px',
    border: '4px solid #56AAFF',
    boxShadow: '0 0 10px 5p' 
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