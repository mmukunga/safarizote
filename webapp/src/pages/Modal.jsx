import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => props.isOpen ? 
   ReactDOM.createPortal(
      <div className="PopUp-Container">
        <div className="PopUp-Content">
          <span className="close-icon" onClick={props.toggle}>x</span>
          {props.content}
          
          <form onSubmit={props.handleSubmit}> 
            <div class="row">
              <div class="col-25">
                <label for="name">Full Names</label>
              </div>
              <div class="col-75">
                <input id='name' name="name" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="email">Email</label>
              </div>
              <div class="col-75">
              <input id='email' name="email" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="date">Arrival Date</label>
              </div>
              <div class="col-75">
              <input id='date' name="date" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="address">Address</label>
              </div>
              <div class="col-75">
              <input id='address' name="address" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="adults">Number of Adults</label>
              </div>
              <div class="col-75">
                <input id='adults' name="adults" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="children">Number of Children</label>
              </div>
              <div class="col-75">
                <input id='children' name="children" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="isGoing">Is Going</label>
              </div>
              <div class="col-75">
              <input type="checkbox" id='isGoing' name="isGoing" onChange={props.handleChange}/>
              </div>
            </div>     
            <div class="row">
              <div class="col-25">
                <label for="safaris">Safaris</label>
              </div>
              <div class="col-75">
              <select id="safari" name="safari" onChange={props.handleChange}>
                  {options.map((option) => (
                    <option value={option.id}>{option.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="message">Message</label>
              </div>
              <div class="col-75">
                <textarea id="message" name="message" onChange={props.handleChange} style={{height:"100px"}}></textarea>
              </div>
            </div>
            <div class="row">
              <input type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      </div>
    , document.body) 
   : null;

export default Modal;