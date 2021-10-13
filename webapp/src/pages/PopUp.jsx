import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  const modal = props.open && (
     <div className='overlay'>
        <div className='popUp'>
          <div style={{width:'100%'}}>
            <input type="button" style={{float:'right', borderRadius:'5%',border:'1px solid red'}} value="X" onClick={props.handleClose}/>
          </div>
          <div class="popUp-content">
            <div dangerouslySetInnerHTML={{__html: props.children}} /> 
            <span className="sub">  
                <Link to={{ pathname: "/email", state: { modal: true }, }} className="link">You can book Here</Link>
              </span>  
          </div>
        </div>
      </div>
    );

  return ReactDOM.createPortal(modal, document.getElementById("portal"));
}

export default PopUp;