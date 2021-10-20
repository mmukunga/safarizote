import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink } from "react-router-dom";

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  const modal = props.open && (
     <div className='overlay'>
        <div className='popUp'>  
          <div class="pHeader">
            <div class="pChild">{props.title} <br/>     
                For reservation and enquires - Send us <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link">Message/E-Mail</NavLink>.</div>
            <div class="pChild"><a href="#" onClick={props.handleClose}>x</a></div>
          </div>        
          <div class="popUp-content">
            <div dangerouslySetInnerHTML={{__html: props.children}} /> 
          </div>
        </div>
      </div>
    );

  return ReactDOM.createPortal(modal, document.getElementById("portal"));
}

export default PopUp;