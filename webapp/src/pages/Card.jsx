import React from 'react';
 
const Card = (props) => {
    const style = {
        width: '500px',
        background: 'lightgrey',
        border: '2px solid red'
    }
 
    return (
        <div style={style}>
          <h3>{props.title}</h3>
          <p>{props.text}</p>
          {props.children}
        </div>
    )
}
 
export default Card;