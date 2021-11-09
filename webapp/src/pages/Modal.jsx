import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";
 
const schema = {
  type: "object",
  title: "A booking information",
  description: "A simple booking data.",
  required: ["name", "email", "date"],
  properties: {
    name:    {type: "string", title: "Full name"},
    email:   {type: "string", title: "Email address"},
    phone:   {type: "string", title: "Phone Number", minLength: 10},
    date:    {type: "string", title: "Arrival Date"},
    adults:  {type: "number", title: "Number of adults"},
    children:{type: "number", title: "Number of children"},
    isGoing: {type: "boolean",title: "Going?", default: false},
    message: {type: "string", title: "Please write us a message"},
    unit: {
      enum: ["kg", "lbs"],
      enumNames: ["KG","lbs"]
    }
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
 
  const modal = ({handleChange, handleSubmit, toggle, options}) => {
    const onChange = ({formData}) => {
      console.log("Data Changed: ",  formData);
      handleChange(formData);
    }
    const onSubmit = ({formData}) => {
      console.log("Data submitted: ",  formData);
      handleSubmit(formData);
    }
    const onError = (errors) => console.log("I have", errors.length, "errors to fix");

  return( <div className="PopUp-Container">
          <div className="PopUp-Content">
            <span className="close-icon" onClick={toggle}>x</span>
            {props.content} 

            <Form schema={schema} uiSchema={uiSchema}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onError={onError}/>
          </div>
        </div>);
  }

  return ReactDOM.createPortal(modal(props), document.body);
}
export default Modal;