import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";

const schema = {
  title: "A booking information",
  description: "A simple booking data.",
  type: "object",
  required: ["title", "email"],
  properties: {
    title: {type: "string", title: "Title", default: "A new booking"},
    name: {type: "string", title: "Full name"},
    email: {type: "string", title: "Email address"},
    telephone: {type: "string", title: "Telephone", minLength: 10},
    date: {type: "string", title: "Arrival Date"},
    adults: {type: "string", title: "Number of adults"},
    children: {type: "string", title: "Number of children"},
    isGoing: {type: "boolean", title: "Going?", default: false},
    message: {type: "string", title: "Please write us a message"}
  }
};

const Modal = (props) => props.isOpen ? 
   ReactDOM.createPortal(
      <div className="PopUp-Container">
        <div className="PopUp-Content">
          <span className="close-icon" onClick={props.toggle}>x</span>
          {props.content} 

          <Form schema={schema}
                  onChange={props.handleChange}
                  onSubmit={props.handleSubmit}
                  onError={console.log("errors")}/>

          <form onSubmit={props.handleSubmit}> 
            <div class="row">
              <div class="col-25">
                <label for="name">Name</label>
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
                <label for="adults">Adults</label>
              </div>
              <div class="col-75">
                <input id='adults' name="adults" onChange={props.handleChange}/>
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="children">Children</label>
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
                <label for="safariId">Safari ID</label>
              </div>
              <div class="col-75">
              <select id="safariId" name="safariId" onChange={props.handleChange}>
                  {props.options.map((option) => (
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