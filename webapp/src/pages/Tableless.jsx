import React, { useState } from 'react';
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Tableless = props => {
    const Card = (props) => {
        return (
        <div style={{ margin: '1em' }}>            
          <div className="tableWrap">
            <div className="tableCol">{Number.isInteger(props.title) ? props.title : parse(props.title)}</div>
            <div className="tableCol">{Number.isInteger(props.description) ? props.description : parse(props.description)} <br/> <Link to={{ pathname: '/email', state: `${props.title}` }} style={{background:'#f8f9fa', textDecoration:'none', fontWeight: 'bold', color: 'brown'}}>Please Click here to enquire</Link></div>
          </div>
        </div>
        )
    }

    const Accordion = ({ children, title, isExpand = false }) => {
      const [expand, setExpand] = useState(isExpand);
      return (
        <div className="box">
          <div className="title-box" onClick={() => setExpand(expand => !expand)}>
            <span className="title">{title}</span>
            <span className="icon"><i className={`fa fa-play-circle${!expand ? ' down' : ''}`}></i></span>
            <div className="clearfix"></div>
          </div>
          {expand && <div className="content">{children}</div>}
        </div>
      )
    }

    return (
    <div>
      <div style={{ margin: '1em' }}>            
        <div className="tableWrap">
          <div className="tableCol tableHeader">Title</div>
          <div className="tableCol tableHeader">Description</div>
        </div>
      </div>
      {props && props.data.map(card => { 
        return (
          <div style={{ margin: '1em' }}>  
            <Card {...card} />
            <Accordion isExpand={true} title="Why do we use it?">
              {Number.isInteger(props.description) ? props.description : parse(props.description)}
              <Link to={{ pathname: '/email', state: `${props.title}` }} style={{background:'#f8f9fa', textDecoration:'none', fontWeight: 'bold', color: 'brown'}}>Please Click here to enquire</Link>
            </Accordion>
          </div>
        )}
      )}
    </div>
  );
} 
export default Tableless; 