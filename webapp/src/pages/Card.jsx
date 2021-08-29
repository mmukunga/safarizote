import React from 'react';

const Card = (props) => {
  const { className, fontColor, children } = props;
  var font_size;

  const minStyles = {
    width: 200,
    height: 50,
    backgroundColor: "red"
  };
  
  const maxStyles = {
    width: 300,
    height: 50,
    backgroundColor: "blue"
  };

  const renderStyles = () => {
    if (window.innerWidth <= 800) {
      return minStyles;
    }
    return maxStyles;
  };

  const divStyle = {
      height: "400px",
      width: "400px",
      backgroundColor: "red",
      margin: "auto",
      "@media (max-width: 600px)": {
          height: "200px",
          width: "200px",
          backgroundColor: "green",
          margin: "auto"
      }
  };

  const styles = {
    hideThisOnBigScreens: {
      display: 'block',
      border: '2px solid purple',
      '@media screen and (max-width: 600px)': {
          display: 'inline-block'
      }
    }
  };

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
        <div style={renderStyles()}>
          One of the jobs of developers is to try to find the most performant 
          solution that won't take a lot of time to implement and also help 
          build a strong, resilient application in the long-term.
        </div>
        <div style={divStyle}>
          In React, inline styles are not specified as a string. Instead they 
          are specified with an object whose key is the camelCased version of 
          the style name, and whose value is the style’s value, usually a string.
        </div>
      </div>
    </div>
  )
}

export default Card;

