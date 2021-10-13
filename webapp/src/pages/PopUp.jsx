import React from 'react';
import ReactDOM from 'react-dom';

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='popUp'>
        <div style={{width:'100%', textAlign:'right'}}>
          <input type="button" value="X" onClick={props.handleClose}/>
        </div>
        <div class="popUp-content">
           <div dangerouslySetInnerHTML={{__html: props.children}} /> 
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default PopUp;