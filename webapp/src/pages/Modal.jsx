import React from 'react';
import {Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Email from './Email';

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
      <div className="model">
        <div className="model-content">
          <input type="button" value="Close Me!" className="close-icon" onClick={() => setShow(false)}/>
          Please book Here
          <Router>
            <Link to="/email">Book Her!</Link>
            <Route path="/email" component={Email} />
          </Router>
          End of booking
          <div dangerouslySetInnerHTML={{__html: children}} />
        </div>
      </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;