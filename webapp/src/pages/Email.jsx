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
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    setForm((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };
  
  const clearState = () => {
    setForm({ ...initialState });
  };

  const handleSubmit = async (e) => {
    console.log('Send Email');
    console.log(e);

    const formData = {
      name: "Simon Mukunga",
      email: "mkunsim@gmail.com",
      message: "Email- Just Testing!! Great Stuff!!",
      dateCreated: new Date()
    };

    axios.post("/api/sendEmail", formData)
      .then(response => {
          alert.success('Customer has been created');
          console.log(response);
          clearState();
          console.log('Send Email OK!');
      }).catch(error => {
          alert.error('Error: Could not save the customer');
          console.log(error);
      });  
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