import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
      <div className="overlay">
        <div className="modal">
          <input type="button" value="Close Me!" className="modal-close" onClick={() => setShow(false)}/>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;