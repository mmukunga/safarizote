import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
        <div className="model">
             <input type="button" value="x" className="close-icon" onClick={() => setShow(false)}/>
             <div dangerouslySetInnerHTML={{__html: children}} /> 
             <span className="sub">             
                <Link to='/email'>You can book Here </Link> &nbsp; Or &nbsp; 
                <Link to={{ pathname: "/email", state: { modal: true }, }} className="link">Here</Link>
             </span>  
        </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;