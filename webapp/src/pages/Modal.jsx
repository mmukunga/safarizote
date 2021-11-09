import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";
 
const schema = {
  type: "object",
  title: "A booking information",
  description: "A simple booking data.",
  required: ["title", "name", "email"],
  properties: {
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

const uiSchema = {
  message: {
     "ui:widget": "textarea"
  },
  date: {
     "ui:widget": "date-time"
  }  
};

const Modal = (props) => {
  if (!props.isOpen) {
      return null;
  }


  const onSubmit = ({formData}) => console.log("Data submitted: ",  formData);

  const modal = ({handleChange, handleSubmit, toggle, options}) => {
  return( <div className="PopUp-Container">
          <div className="PopUp-Content">
            <span className="close-icon" onClick={toggle}>x</span>
            {props.content} 

            <Form schema={schema}  uiSchema={uiSchema}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                    onError={console.log("errors")}/>
          </div>
        </div>);
  }

  return ReactDOM.createPortal(modal(props), document.body);
}
export default Modal;