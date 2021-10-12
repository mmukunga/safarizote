import React from 'react';
import ReactDOM from 'react-dom';

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='popUp'>
        <p>Hello World!</p>
        <label>Close Me!
           <input type="button" onClick={props.handleClose}/>
        </label>
        <div class="popUp-body">
           <div dangerouslySetInnerHTML={{__html: props.children}} /> 
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default PopUp;