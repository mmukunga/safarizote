import React from "react";
import Card from "./Card";
import { TextArea, Submit, InputWrapper } from "./Components";
import { SmartForm } from './SmartForm';
import Emoji from "./Emoji";

const defaultValues = {
  name:  'Mkunsim',
  email: 'abc@dfg.hio',
  phone: '+01 2345 67 890',
  message: 'Please write a message'
};

const ContactUs = () => {
  const [state, setState] = React.useState("Karibu");
  function post(url, data) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }

  const onSubmit = (data) => {
    post("/api/sendMessage", data).then((resp) => {
      resp.status === 200 ? setState("Success") : setState("Error");
    });
  };
  const hasLabel = {labeled: true, error: false};
  console.log(state);
  return ( 
  <Card className="Card" title="ContactUs" >
    <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
        <InputWrapper type="text"  labelObj={hasLabel} id="name"  name="name" />
        <InputWrapper type="email" labelObj={hasLabel} id="email" name="email"/>
        <InputWrapper type="phone" labelObj={hasLabel} id="phone" name="phone"/>
        <TextArea id="message" name="message"/>
        <div className="btn"><Submit name="Submit" type="submit"><Emoji label='Send'/>Submit</Submit></div>
    </SmartForm>
  </Card>)
};
  
export default ContactUs;