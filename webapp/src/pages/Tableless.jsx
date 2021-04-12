import React, { useState} from 'react';
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Tableless = props => {

    const Accordion = ({ children, title, isExpand = false }) => {
      const [expand, setExpand] = useState(isExpand);
      return (
        <div className="box">
          <div onClick={() => setExpand(expand => !expand)}>
            <span className="title">{parse(title)} <i className={`fa fa-play-circle${!expand ? ' down' : ''}`}></i></span>
            <div className="clearfix"></div>
          </div>
          {expand && <div>{children}</div>}
        </div>
      )
    }

    return (
    <div>
      {props && props.data.map(card =>{ return (
        <Accordion isExpand={true} title={card.title}>
          ..ADD YOUR TEXT HERE..
        </Accordion>
      ); })}
    </div>
  );
} 
export default Tableless; 