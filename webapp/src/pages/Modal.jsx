import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';

const Modal = ({ children, show, setShow }) => {
  const content = show && (
      <div className="overlay">
        <div className="modal">
          <input type="button" value="Close Me!" className="modal-close" onClick={() => setShow(false)}/>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  
    return createPortal(content, document.getElementById("portal"));
}

export default Modal;