import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  const modal = props.open && (
     <div className='overlay'>
        <div className='popUp'>          
          <div style={{width:'100%'}}>
            <a href="#" className="CloseMe" onClick={props.handleClose}>x</a>
          </div>
          <div class="popUp-content">  
            <h3>{props.title}</h3>          
            <span className="sub">  
                <Link to={{ pathname: "/email", state: { modal: true }, }} className="link">You can book Here</Link>
              </span>  
            <div dangerouslySetInnerHTML={{__html: props.children}} /> 
          </div>
        </div>
      </div>
    );

  return ReactDOM.createPortal(modal, document.getElementById("portal"));
}

export default PopUp;