import React from "react";
import axios from 'axios';
import { Redirect, useLocation } from "react-router-dom";
import UserForm, { InputField } from "./UserForm";

const initialState = {
  email: 'mkunsim@gmail.com', password:'12345'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {...state, ...action.payload};
    default:
      throw new Error();
  }
}

const SignIn = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const { state } = useLocation();

  console.log('!!BINGO!!');

  const onChange = e => {
    const { name, value } = e.target;
    const newState = { ...state, [name]: value };
    dispatch({type: 'SET_LOGIN', payload: newState});
  };

  const login = () => {
    console.log('Sign In!!');
    axios.post('/api/login', userAuth).then(response => {
      console.log(response);
      setIsLogedIn(true);
      localStorage.setItem('token', response.data);
    });
  }

  if (isLogedIn === true) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <div controlId="ControlId">
      Please Sign In!
      <UserForm
        cancel={() => {console.log('cancel')}}
        errors={[]}
        onChange={onChange}
        submit={login}
        elements={() => (
          <>       
            <InputField name="email" text="Email:" type="text" handleChange={onChange} placeholder="Write here.."/>
            <InputField name="password" text="Password:" type="text" handleChange={onChange} placeholder="Write here.."/>
          </>
        )}
      >    
      </UserForm>
    </div>
    );
} 

export default SignIn;