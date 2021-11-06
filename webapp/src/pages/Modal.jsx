import React from "react";

const Modal = props => {
    return (
      <div className="PopUp-Container">
        <div className="PopUp-Content">
          <span className="close-icon" onClick={props.setIsOpen}>x</span>
          {props.content}
          <p>You can put extras too</p>
        </div>
      </div>
    );
  };

export default Modal;