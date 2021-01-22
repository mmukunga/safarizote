import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import UserForm, { InputField } from "./UserForm";
import fakeAuth from './Auth';

const SignIn = () => {
  const [user, setUser] = React.useState({email:'', password:''});
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

  const { state } = useLocation();

  const handleSubmit = e => {
    e.preventDefault();
    /* fetch api */
    console.log('Sign In!!');
    /* clear state */
    // dispatch({ type: "reset" });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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