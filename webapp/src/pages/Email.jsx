import React, { useState } from "react";
import UserForm, { InputField, TextArea } from "./UserForm";
import axios from 'axios';

const initialState = {
  username: "",
  email: "",
  message: "",
  dateCreated: new Date()
};

const Email = () => {
  const [email, setEmail] = useState(initialState);

  const handleChange = (event) => {
    setEmail((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };
  
  const clearState = () => {
    setEmail({ ...initialState });
  };

  const handleSubmit = async (e) => {
    console.log('Send Email');
    console.log(e);
    console.log('Send Email OK!');
    let response = await axios.post("/api/sendEmail", email);

    clearState();

    console.log(response);
  };

  return (
    <div className="Email">
    <p>Please send us a Message..</p>
    <UserForm
      cancel={() => {console.log('cancel')}}
      errors={[]}
      onChange={handleChange}
      submit={handleSubmit}
      elements={() => (
        <>
          
            <InputField name="name" text="Name" type="text" onChange={handleChange}/>
            <InputField name="email" text="Email" type="email" onChange={handleChange}/>
            <TextArea name="message" text="Message" rows="4" cols="50" placeholder="Write here.."  onChange={handleChange}/>
        </>
      )}
    >    
    </UserForm>
    </div>
  );
};

export default Email;