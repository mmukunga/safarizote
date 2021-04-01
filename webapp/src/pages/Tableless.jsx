import React from 'react';
import parse from "html-react-parser";

const Tableless = props => {
    console.log(props);
    const Card = (props) => {
        console.log(props);
        return (
        <div style={{ margin: '1em' }}>            
          <div className="tableWrap">
            <div className="tableCol" style={{width:'30%'}}>{Number.isInteger(props.title) ? props.title : parse(props.title)}</div>
            <div className="tableCol" style={{width:'70%'}}>{Number.isInteger(props.description) ? props.description : parse(props.description)}</div>
          </div>
        </div>
        )
    }
    return (
    <div>
      <div style={{ margin: '1em' }}>            
        <div className="tableWrap">
          <div className="tableCol tableHeader" style={{width:'30%'}}>Title</div>
          <div className="tableCol tableHeader" style={{width:'70%'}}>Description</div>
        </div>
      </div>
      {props && props.data.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
} 
export default Tableless; 