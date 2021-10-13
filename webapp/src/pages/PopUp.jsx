import React from 'react';
import ReactDOM from 'react-dom';

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='popUp'>
        <p style={{textAlign:'right'}}>
          <input type="button" value="X" onClick={props.handleClose}/>
        </p>
        <input type="button" value="x" className="close-icon" onClick={props.handleClose}/>
        <div class="popUp-content">
           <div dangerouslySetInnerHTML={{__html: props.children}} /> 
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default PopUp;