import React from 'react';

const Modal = ({ show, close }) => {
    return (
      <div>
       { show ? <div className="modalContainer" onClick={() => close()} >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">Modal Title</h2>
              <button className="modal_close" onClick={() => close()}>
                <span style={{color:'red', fontSize:'24px'}}>X</span>
              </button>
            </header>
            <main className="modal_content">This is modal content</main>
            <footer className="modal_footer">
              <button className="modal_close" onClick={() => close()}>
                Cancel
              </button>
  
              <button className="modal_submit">Submit</button>
            </footer>
          </div>
        </div>
        : null
       }
      </div>
    );
  };

export default Modal;