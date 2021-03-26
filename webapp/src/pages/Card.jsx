import React from 'react';

const Card = (props) => {

  //const { className, fontColor, backgroundColor, children } = props;
  const { className, fontColor, children } = props;
  /*
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
*/
  const labelStyles = {color: fontColor};
  console.log(className);
  return (
    <div className={className}>
      <div style={labelStyles}>
        {children}
      </div>
    </div>
  )
}

export default Card;