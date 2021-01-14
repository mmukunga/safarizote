import React, { useState } from "react";
import UserForm, { Input, Button, TextArea } from "./UserForm";
import axios from 'axios';

const Email = () => {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const { name, email, message } = e.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    let response = await axios.get("/api/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
    });

    setStatus("Submit");
    let result = await response.data;
    alert(result.status);
  };

  return (
    
    <UserForm
      cancel={() => {console.log('cancel')}}
      errors={[]}
      onChange={handleChange}
      submit={handleSubmit}
      elements={() => (
        <>
          <div controlId="ControlId">
            Please Sign In!
            <Input id="name" handleChange={handleChange}/>
            <Input id="email" handleChange={handleChange}/>
            <TextArea id="email" handleChange={handleChange}/>
          </div>
        </>
      )}
    >    
    </UserForm>
  );
};

export default Email;