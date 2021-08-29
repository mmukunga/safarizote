import React from 'react';
import styled, { css } from 'styled-components';

const Card = (props) => {
  const { className, fontSize, children } = props;
  const labelStyles = styled.div`
      fontSize: '2.5vw',
      margin: '2px',
      padding: '2px',
      border: '2px solid red',
      @media screen and (max-width: 600px) {
        font-size: ${fontSize};
      }
`;

  return (
    <div className={className}>
      <div style={labelStyles}>
        {children}
      </div>
    </div>
  )
}

export default Card;