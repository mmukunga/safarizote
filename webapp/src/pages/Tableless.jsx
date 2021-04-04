import React from 'react';
import parse from "html-react-parser";

const Tableless = props => {
    console.log(props);
    const Card = (props) => {
        console.log(props);
        return (
        <div style={{ margin: '1em' }}>            
          <div className="tableWrap">
            <div className="tableCol">{Number.isInteger(props.title) ? props.title : parse(props.title)}</div>
            <div className="tableCol">{Number.isInteger(props.description) ? props.description : parse(props.description)}  <Link to={{ pathname: '/email', state: `${props.id}` }}>Please Enquire Here</Link></div>
          </div>
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
      {props && props.data.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
} 
export default Tableless; 