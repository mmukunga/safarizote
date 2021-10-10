import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
        <div className="model">
             <input type="button" className="close-icon" onClick={() => setShow(false)}/>
             <div dangerouslySetInnerHTML={{__html: children}} /> 
             <p style={{fontSize:'24px'}}>             
                <Link to='/email'>You can book Here </Link> &nbsp; Or &nbsp; 
                <Link to={{ pathname: "/email", state: { modal: true }, }} className="link">Here</Link>
             </p>  
        </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;