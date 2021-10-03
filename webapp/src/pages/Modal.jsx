import React from 'react';

const Modal = (props) => {
  console.log('Modal - Click!!!!');
  console.log(props.title);
  console.log(props.children);
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
                Les mer i Aftenposten: Bjørndalen og Hanevold ikke tøffe nok. 
                Her er listen over de 60 tøffeste idrettene: 1. Boksing 2. Ishockey 3. Amerikansk fotball
                Les mer i Aftenposten: Bjørndalen og Hanevold ikke tøffe nok. 
                Her er listen over de 60 tøffeste idrettene: 1. Boksing 2. Ishockey 3. Amerikansk fotball
            </main>
            <footer className="modal-footer">
              <button className="modal-button" onClick={props.onClose}>Close</button>
            </footer>
          </div>
        </div>
    );
  };

export default Modal;