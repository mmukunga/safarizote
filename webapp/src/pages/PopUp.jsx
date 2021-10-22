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
            <div class="pChild">{props.title}     
                For reservation and enquires - Send us a 
                <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">Message or E-Mail</NavLink>
                <input type="submit" value="AddItem" onClick={() => props.addToCart(props.data)} />
                <input type="submit" value="remove" onClick={() => props.removeFromCart(props.data)} />
              </div>
            <div class="pCloseMe"><a href="#" onClick={props.handleClose}>X</a></div>
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