import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink } from "react-router-dom";

const PopUp = (props) => {
  const [checked, setChecked] = React.useState(false);

  if (!props.open) { 
      return null;
  }
  
  const modal = props.open && (
     <div className='overlay'>
        <div className='popUp'>  
          <div class="pHeader">
            <div class="pChild"><span className="SafariTitle">{props.title}</span>     
                For reservation and enquires - Send us a 
                <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">Message or E-Mail</NavLink>
              </div>
            <div class="pCloseMe"><a href="#" onClick={props.handleClose}>X</a></div>
          </div>        
          <div class="popUp-content">
            <div dangerouslySetInnerHTML={{__html: props.children}} /> 
          </div>
        </div>
      </div>
    );

  return ReactDOM.createPortal(modal, document.getElementById("modal_root"));
}

export default PopUp;