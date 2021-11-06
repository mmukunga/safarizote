import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => props.isOpen ? 
   ReactDOM.createPortal(
      <div className="PopUp-Container">
        <div className="PopUp-Content">
          <span className="close-icon" onClick={props.toggle}>x</span>
          {props.content}
          <p>You can put extras too</p>
        </div>
      </div>
    , document.body) 
   : null;

export default Modal;