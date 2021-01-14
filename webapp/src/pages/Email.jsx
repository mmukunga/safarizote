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

  const onChange=(e)=>{
    const { name, value } = e.target;
    setEmail(prevState => ({ ...prevState, [name]: value }));
    };
  
    const clearState = () => {
      setEmail({ ...initialState });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await axios.post("/api/sendEmail", email, {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }
    });

    clearState();

    console.log(response);
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
            <InputField id="name" handleChange={onChange}/>
            <InputField id="email" handleChange={onChange}/>
            <TextArea id="message" handleChange={onChange}/>
          </div>
        </>
      )}
    >    
    </UserForm>
  );
};

export default Email;