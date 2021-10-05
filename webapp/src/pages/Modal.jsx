import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
      <div className="model">
        <div className="model-content">
          <input type="button" value="Close Me!" className="close-icon" onClick={() => setShow(false)}/>
          <div>{children}
            <center><img src="clouds.jpg" align="BOTTOM"/> </center>
            <hr/>
            <a href="http://somegreatsite.com">Link Name</a>
            is a link to another nifty site
            <h1>This is a Header</h1>
            <h2>This is a Medium Header</h2>
            Send me mail at <a href="mailto:support@yourcompany.com">
            support@yourcompany.com</a>.
            <p>This is a new paragraph!</p>
            <p><b>This is a new paragraph!</b></p>
            <br/> 
            <b><i>This is a new sentence without a paragraph break, in bold italics.</i></b>
            <hr/>
          </div>
        </div>
      </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;