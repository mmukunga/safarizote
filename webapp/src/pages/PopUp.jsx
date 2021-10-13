import React from 'react';
import ReactDOM from 'react-dom';

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='popUp'>
        <span style={{textAlign:'right'}}>
          <input type="button" value="X" onClick={props.handleClose}/>
        </span>
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