import React, { useState, useEffect } from "react";
import UserForm, { InputField, TextArea } from "./UserForm";
import axios from 'axios';

const initialState = {
  name: "Simon Mukunga",
  email: "mkunsim@gmail.com",
  message: "Email- Just Testing!! Great Stuff!!",
  dateCreated: new Date()
};

const Email = () => {
  const [formData, setFormData] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/email")
        .then(response => {
          setUsers(response.data)
        })
  }, []);

  const handleChange = (event) => {
    setFormData((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };
  
  const clearState = () => {
    setFormData({ ...initialState });
  };

  const handleSubmit = async (e) => {
    axios.post("/api/sendEmail", formData)
      .then(response => {
          clearState();
      }).catch(error => {
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
          <InputField name="name" text="Name:" type="text" onChange={handleChange} placeholder="Write here.."/>
          <InputField name="email" text="E-mail:" type="text" onChange={handleChange} placeholder="Write here.."/>
          <TextArea name="message" text="Message:" rows="4" cols="50" onChange={handleChange} placeholder="Write here.."/>
        </>
      )}
    >    
    </UserForm>
    </div>
  );
};

export default Email;