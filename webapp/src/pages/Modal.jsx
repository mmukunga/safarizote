import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';

const Modal = ({ children, show, setShow }) => {
  const content = show && (
      <div className="overlay">
        <div className="modal">
          <button className="modal-close" type="button" onClick={() => setShow(false)}>X</button>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  
    return createPortal(content, document.getElementById("portal"));
}

export default Modal;