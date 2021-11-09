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

const Modal = (props) => {
  if (!props.isOpen) {
      return null;
  }

  const modal = ({handleChange, handleSubmit, toggle, options}) => {
  return( <div className="PopUp-Container">
          <div className="PopUp-Content">
            <span className="close-icon" onClick={toggle}>x</span>
            {props.content} 

            <Form schema={schema}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onError={console.log("errors")}/>

            <form onSubmit={handleSubmit}> 
              <div className="row">
                <div className="col-25">
                  <label forHtml="name">Name</label>
                </div>
                <div className="col-75">
                  <input id='name' name="name" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label forHtml="email">Email</label>
                </div>
                <div className="col-75">
                <input id='email' name="email" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label forHtml="date">Arrival Date</label>
                </div>
                <div className="col-75">
                <input id='date' name="date" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label forHtml="address">Address</label>
                </div>
                <div className="col-75">
                <input id='address' name="address" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label forHtml="adults">Adults</label>
                </div>
                <div className="col-75">
                  <input id='adults' name="adults" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label forHtml="children">Children</label>
                </div>
                <div className="col-75">
                  <input id='children' name="children" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label forHtml="isGoing">Is Going</label>
                </div>
                <div className="col-75">
                <input type="checkbox" id='isGoing' name="isGoing" onChange={handleChange}/>
                </div>
              </div>     
              <div className="row">
                <div className="col-25">
                  <label forHtml="safariId">Safari ID</label>
                </div>
                <div className="col-75">
                <select id="safariId" name="safariId" onChange={handleChange}>
                    {options.map((option) => (
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
                  <textarea id="message" name="message" onChange={handleChange} style={{height:"100px"}}></textarea>
                </div>
              </div>
              <div className="row">
                <input type="submit" value="Submit"/>
              </div>
            </form>
          </div>
        </div>);
  }

  return ReactDOM.createPortal(modal(props), document.body);
}
export default Modal;