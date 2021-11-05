import React from "react";

const Modal = props => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
          <p>You can put extras too</p>
        </div>
      </div>
    );
  };

export default Modal;