import React from "react";
import Card from "./Card";
import { TextArea, Submit, InputWrapper } from "./Components";
import { SmartForm } from './SmartForm';
import Emoji from "./Emoji";

const defaultValues = {
  name:  'Abc Def',
  email: 'abc@efg.hig',
  phone: '+00 123 45 678',
  message: 'Lorem ipsum ...'
};

const ContactUs = () => {
  const [state, setState] = React.useState("Pristine");
  function post(url, data) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
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
  return ( 
  <Card className="Card" title="" >
    <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
        <InputWrapper type="text"  labelObj={hasLabel} id="name"  name="name" />
        <InputWrapper type="email" labelObj={hasLabel} id="email" name="email"/>
        <InputWrapper type="phone" labelObj={hasLabel} id="phone" name="phone"/>
        <TextArea id="message" name="message"/>
        <Submit name="Submit" type="submit"><Emoji label='Send'/>Submit</Submit>
    </SmartForm>
  </Card>)
};
  
export default ContactUs;