import React from 'react';

const Modal = (props) => {
    console.log('Modal - Click!!!!');
    if(!props.show) {return null;}
    return (
       <div className={`modal ${props.show ? 'show':''}`} onClick={props.onClose} >
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <header className="modal-header">
              <h2 className="modal-title">MMS {props.title}</h2> 
            </header>
            <main className="modal-body">
                {props.children}
            </main>
            <footer className="modal-footer">
              <button className="modal-button" onClick={props.onClose}>Close</button>
            </footer>
          </div>
        </div>
    );
  };

export default Modal;