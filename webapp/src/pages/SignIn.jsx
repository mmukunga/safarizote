import React, { useState, useReducer } from "react";
import {Redirect, useLocation } from "react-router-dom";
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
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

  const { state } = useLocation();

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

  const login = () => fakeAuth.authenticate(() => {
    setRedirectToReferrer(true)
  })

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }

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