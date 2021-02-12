import React from 'react';
 
const Card = (props) => {

  const { cardWidth, fontColor, backgroundColor, borderColor,  children } = props;
  const style = {
    width: cardWidth,
    backgroundColor: backgroundColor,
    color: fontColor,
    borderRadius: 10,
    margin: '10px auto',
    padding: '1px',
    border: '4px solid #F0FFFF',
    boxShadow: '0 0 10px 5p' 
  };

  const border = '4px solid ' + { borderColor };
  const labelStyles = { color: fontColor, border: '4px solid red'};
 
    return (
      <div style={style}>   
           <div style={labelStyles}>
               { children }
            </div>
      </div>
    )
}
 
export default Card;