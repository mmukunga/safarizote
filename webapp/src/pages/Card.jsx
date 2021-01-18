import React from 'react';
 
const Card = (props) => {
    const style = {
        margin: '0 auto',
        padding: '5px',
       /* border: '2px solid lightgrey' */
    }
 
    return (
      <div style={style} className="Card">
          <p>{props.text}</p>         
          <span>{props.title}</span>
          {props.children}
      </div>
    )
}
 
export default Card;