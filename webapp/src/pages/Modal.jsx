import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, show, setShow}) => {
  const modal = show && (
      <div className="model">
        <div className="model-content">
          <input type="button" value="Close Me!" className="close-icon" onClick={() => setShow(false)}/>
          <div>{children}
            <CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"/> </CENTER>
            <HR/>
            <a href="http://somegreatsite.com">Link Name</a>
            is a link to another nifty site
            <H1>This is a Header</H1>
            <H2>This is a Medium Header</H2>
            Send me mail at <a href="mailto:support@yourcompany.com">
            support@yourcompany.com</a>.
            <P> This is a new paragraph!</P>
            <P> <B>This is a new paragraph!</B> </P>
            <BR/> 
            <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>
            <HR/>
          </div>
        </div>
      </div>
    );
  
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default Modal;