import React from 'react';
import { Link } from "react-router-dom";
import { auth } from './firebase';
import { useAuth } from './AuthProvider';
import { Submit, InputWrapper } from "./Components";
import { SmartForm } from './SmartForm';
import Card from './Card';

const Login = () => {
  const {onLogin, error} = useAuth();
  const defaultValues = {
    email:  'mkunsim@gmail.com',
    password: '*******'
  };

  const onSubmit = (data) => {
    onLogin({ auth, data}).catch(() =>
        console.log('Login error!!')
      );
  };
  
  const hasLabel = {labeled: true, error: false};

  return (
  <Card title="Login" className="Card">
    {error && <div className='auth__error'>{error}</div>}
    <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
          <InputWrapper type="email" labelObj={hasLabel} id="email" name="email"/>
          <InputWrapper type="password" labelObj={hasLabel} id="password" name="password"/>
          <Submit name="Submit" type="submit">Submit</Submit>
    </SmartForm>
    <div>{error && error.name && <span>This field is required</span>}</div>  
    <div className="Info">
    <Link to='/register' className='link'>Register here!</Link>
    </div>
  </Card>  
)
}

export default Login;