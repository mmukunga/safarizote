import React from 'react';
 
const Card = (props) => {
    const style = {
        margin: '0 auto',
        padding: '5px',
        border: '2px solid lightgrey'
    }
 
    return (
      <div style={style} className="Card">
          <h3>{props.title}</h3>
          <p>{props.text}</p>
          {props.children}
      </div>
    )
}
 
export default Card;