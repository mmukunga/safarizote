import React from "react";
import Card from "./Card";
import { TextArea, Submit, InputWrapper } from "./Components";
import { SmartForm } from './SmartForm';

const defaultValues = {
  name:  'Maji Moto',
  email: 'mkunsim@gmail.com',
  phone: '+47 999 11 098',
  message: 'Jambo Kenya. 11. mar. 2020 — Velger å selge Gucci beltet mitt som jeg aldri har brukt Jeg kjøpte det oktober 2019 på Gucci-butikken her i Oslo✨ Beltet er 105cm langt ...'
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
        <InputWrapper type="text" labelObj={hasLabel} id="name" name="name" />
        <InputWrapper type="email" labelObj={hasLabel} id="email" name="email"/>
        <InputWrapper type="phone" labelObj={hasLabel} id="phone" name="phone"/>
        <TextArea id="message" name="message"/>
        <Submit type="submit" name="Submit">Submit</Submit>
    </SmartForm>
  </Card>)
};
  
export default ContactUs;