import React from 'react';
import {auth} from './firebase'
import {useAuth} from './AuthProvider';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { InputWrapper, Submit } from "./Components";
import { SmartForm } from './SmartForm';
import Card from './Card';
import axios from 'axios';

const Register = () => {
  const {onRegister, error} = useAuth();
  
  const defaultValues = {
    email:  '',
    password: '',
    confirm:  ''
  };
  const {errors} = useForm({defaultValues});
  
  const onSubmit = (data) => {
    axios.post('/api/validate', data.password)
    .then(res => {
      console.log(res);
      if (data.password == data.confirm) {
        console.log(data);
        onRegister({auth, data}).catch(() =>
            console.log('Invalid email or password')
          );
      } else {
        console.log('Invalid password')
      }  
    }).catch(err => {
        console.log(err);
    });
  };

  const hasLabel = {label: true};
  
  return (
     <Card title="Register" className='Card'>
       {error && <div className='auth__error'>{error}</div>}
       <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
         <InputWrapper type="email" labelObj={hasLabel} id="email" name="email"/>
         <InputWrapper type="password" labelObj={hasLabel} id="password" name="password"/>
         <InputWrapper type="password" labelObj={hasLabel} id="confirm" name="confirm"/>
         <Submit type="submit" name="Submit">Register</Submit>
       </SmartForm>
       <div>{errors && errors.name && <span>This field is required</span>}</div>  
       <div className="registration">
          Registered already?  
          <Link to='/login' className='Link'>Login</Link>
        </div>
      </Card>
  )
}

export default Register