import React from 'react';
import styled, { css } from 'styled-components';

const Card = (props) => {
  const { className, fontColor, children } = props;
  const CardWrapper = styled.div`
      fontSize: '2.5vw';
      margin: '2px';
      padding: '2px';
      border: '2px solid red';

      @media screen and (max-width: 600px) {
          font-size: '30px';
      }
`;

  return (
    <div className={className}>
        <CardWrapper>
            {children}
        </CardWrapper>
    </div>
  )
}

export default Card;