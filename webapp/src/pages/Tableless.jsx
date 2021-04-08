import React from 'react';
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
      {props && props.data.map(card =>{ return (
        <>
        <Card {...card} />
        <Accordion isExpand={true} title="Why do we use it?">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content 
          here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use 
          Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
          Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Accordion>
        </>
      ); })}
    </div>
  );
} 
export default Tableless; 