import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
      <div className="model">
        <div className="model-content">
          <input type="button" value="Close Me!" className="close-icon" onClick={() => setShow(false)}/>
          <div dangerouslySetInnerHTML={{__html: children}} />
          Please book Here 
              <Link to='/email'>Go to Booking</Link>
              End of booking
        </div>
      </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;