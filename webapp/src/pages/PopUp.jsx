import React from 'react'

const PopUp = (props) => {
  if (!props.open) { 
      return null;
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='popUp'>
        <p>Hello World!</p>
        <button onClick={props.handleClose}>Close Me!</button>
      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default PopUp;