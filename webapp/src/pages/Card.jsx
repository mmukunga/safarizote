import React from 'react';;

const Card = (props) => {
  const { className, fontColor, children } = props;
  const labelStyles = styled.div`
    fontSize: '2.5vw',
    margin: '2px',
    padding: '2px',
    border: '2px solid red',
    @media screen and (max-width: 600px) {
      font-size: 30px;
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