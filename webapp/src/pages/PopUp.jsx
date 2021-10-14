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
          <div classNme="popUpHeader">
            <div className="CloseMe">
              <a href="#" onClick={props.handleClose}>x</a>
            </div>
            <div style={{border:'1px solid white'}}>{props.title}</div>
          </div>
          <div class="popUp-content">            
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