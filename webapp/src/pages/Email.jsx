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

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setEmail(prevState => ({ ...prevState, [name]: value }));
    };
  
    const clearState = () => {
      setEmail({ ...initialState });
    };

  const handleSubmit = async (e) => {
    console.log('Send Email');
    console.log(e);
    console.log('Send Email OK!');
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
          <div className="Email">
            Please send us a Message..
            <InputField name="name" text="Name" type="text" onChange={handleChange}/>
            <InputField name="email" text="Email" type="email" onChange={handleChange}/>
            <TextArea name="message" text="Message" rows="4" cols="50" placeholder="Write here.."  onChange={handleChange}/>
          </div>
        </>
      )}
    >    
    </UserForm>
  );
};

export default Email;