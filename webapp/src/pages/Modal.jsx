import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
      <div className="popup-box">
        <div className="box">
          <input type="button" value="Close Me!" className="close-icon" onClick={() => setShow(false)}/>
          {children}
        </div>
      </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;