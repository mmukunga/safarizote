import React from 'react';
import Radium, {StyleRoot} from 'radium';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = {
    divStyle: {
      fontSize: '2.0vw',
      margin: '2px',
      padding: '2px',
      border: '2px solid red',
      '@media (max-width: 600px)': {
          backgroundColor: 'green',
          fontSize: '24px'
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

