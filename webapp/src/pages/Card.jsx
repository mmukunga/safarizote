import React from 'react';
import Radium from 'radium';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = {
    divStyle: {
      fontSize: '2.5vh',
      margin: '2px',
      fontColor: `${fontColor}`,
      padding: '2px',
      border: '2px solid red',
      '@media (max-width: 600px)': {
          backgroundColor: 'green',
          fontSize: '3.5vw'
      }
    }
  };

  const StyleRoot = Radium.StyleRoot;

  return (
    <div className={className}>
      <StyleRoot style={labelStyles.divStyle}>
        {children}
      </StyleRoot>
    </div>
  )
}

export default Card;

