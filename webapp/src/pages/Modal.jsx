import React from "react";
import ReactDOM from "react-dom";

const options = [
  {
    nextId: 0,
    title: "Masaai Mara",
  },
  {
    nextId: 1,
    title: "Kilimanjaro",
  }
];

const Modal = (props) => props.isOpen ? 
   ReactDOM.createPortal(
      <div className="PopUp-Container">
        <div className="PopUp-Content">
          <span className="close-icon" onClick={props.toggle}>x</span>
          {props.content}
          <form onSubmit={props.handleSubmit}>        
            <div>
              <label>Going<input type="checkbox" id='isGoing' name="isGoing" onChange={props.handleChange}/></label>
            </div>
            <div>
              <label>Full Names<input id='name' name="name" onChange={props.handleChange}/></label>
            </div>
            <div>
              <label>Email<input id='email' name="email" onChange={props.handleChange}/></label>
            </div>
            <div>
              <label>Message<textarea id='message' name="message" onChange={props.handleChange}/></label>
            </div>
            <div>
              <label>Safaris
                <select id="safari" name="safari" onChange={props.handleChange}>
                  {options.map((option) => (
                    <option value={option.nextId}>{option.title}</option>
                  ))}
                </select>
              </label>
            </div>
            <button>Submit</button>
          </form> 
        </div>
      </div>
    , document.body) 
   : null;

export default Modal;