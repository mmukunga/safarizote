import React from 'react';
import { useStyles } from './CardStyles';

const Card = (props) => {
  const classes = useStyles(props.styleProps);
  return (
    <div data-testid="card-item" className={`card ${classes.root}`}>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  )
}

export default Card;