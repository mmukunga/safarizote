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
            <div className="row">
              <div className="col-25">
                <label forHtml="name">Name</label>
              </div>
              <div className="col-75">
                <input id='name' name="name" onChange={props.handleChange}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="email">Email</label>
              </div>
              <div className="col-75">
              <input id='email' name="email" onChange={props.handleChange}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="date">Arrival Date</label>
              </div>
              <div className="col-75">
              <input id='date' name="date" onChange={props.handleChange}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="address">Address</label>
              </div>
              <div className="col-75">
              <input id='address' name="address" onChange={props.handleChange}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="adults">Adults</label>
              </div>
              <div className="col-75">
                <input id='adults' name="adults" onChange={props.handleChange}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="children">Children</label>
              </div>
              <div className="col-75">
                <input id='children' name="children" onChange={props.handleChange}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="isGoing">Is Going</label>
              </div>
              <div className="col-75">
              <input type="checkbox" id='isGoing' name="isGoing" onChange={props.handleChange}/>
              </div>
            </div>     
            <div className="row">
              <div className="col-25">
                <label forHtml="safariId">Safari ID</label>
              </div>
              <div className="col-75">
              <select id="safariId" name="safariId" onChange={props.handleChange}>
                  {props.options.map((option) => (
                    <option value={option.id}>{option.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label forHtml="message">Message</label>
              </div>
              <div className="col-75">
                <textarea id="message" name="message" onChange={props.handleChange} style={{height:"100px"}}></textarea>
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      </div>
    , document.body) 
   : null;

export default Modal;