import React from 'react';
import {auth} from './firebase'
import {useAuth} from './AuthProvider';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { InputWrapper, Submit } from "./Components";
import { SmartForm } from './SmartForm';
import Card from './Card';

const Register = () => {
  const {onRegister, error} = useAuth();
  
  const defaultValues = {
    email:  '',
    password: '',
    confirm:  ''
  };
  const {errors} = useForm({defaultValues});
  
  const onSubmit = (data) => {
    if (data.password == data.confirm) {
      onRegister({ auth, data}).catch(() =>
          console.log('Invalid email or password')
        );
    } else {
      console.log('Invalid password')
    }  
  };

  return (
     <Card title="Register" className='Card'>
       {error && <div className='auth__error'>{error}</div>}
       <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
         <InputWrapper type="email" id="email" name="email"/>
         <InputWrapper type="password" id="password" name="password"/>
         <InputWrapper type="password" id="confirm" name="confirm"/>
         <Submit type="submit" name="Submit">Register</Submit>
       </SmartForm>
       <div>{errors && errors.name && <span>This field is required</span>}</div>  
       <div className="Info">
          Registered already?  
          <Link to='/login' className='Link'>Login</Link>
        </div>
      </Card>
  )
}

export default Register