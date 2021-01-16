import React, { useState, useReducer } from "react";
import UserForm, { InputField } from "./UserForm";

const initialState = {
  email: "",
  password: ""
};

const reducer = (state, action) => {
  if (action.type === "reset") {
      return initialState;
  }

  const result = { ...state };
  result[action.type] = action.value;
  return result;
};

const SignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password } = state;

  const handleSubmit = e => {
    e.preventDefault();
    /* fetch api */
    console.log('Sign In!!');
    /* clear state */
    dispatch({ type: "reset" });
};

const onChange = e => {
  const { name, value } = e.target;
  dispatch({ type: name, value });
};

  return (
    <div controlId="ControlId">
      Please Sign In!
      <UserForm
        cancel={() => {console.log('cancel')}}
        errors={[]}
        onChange={onChange}
        submit={handleSubmit}
        elements={() => (
          <>       
            <InputField handleChange={onChange}/>
            <InputField handleChange={onChange}/>
          </>
        )}
      >    
      </UserForm>
    </div>
    );
} 

export default SignIn;