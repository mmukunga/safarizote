import React from 'react';
import {Redirect } from 'react-router-dom';
import Card from './Card';
import UserService from './UserService';

const SignIn = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(0);
    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });

    const { from } = props.location.state || { from: { pathname: '/' } }

    const handleChange = (event) => {
      const {name, value} = event.target;
      console.log('name: ' + name + ' value: ' + value);
      setForm({...form, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
          username: form.email,
          password: form.password
        };

        UserService.loginUser(user).then(response => {
          console.log(response);
          localStorage.setItem('jwt_token', response.token);         
          setLoggedIn((prevState) => prevState + 1);
        }).catch(err => {
          console.log(err);
        });
        
    };
      
    if (UserService.isLoggedIn() != 'PleaseLogIn') {
      console.log('Login Date ' + new Date());
      console.log('SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
      return <Redirect to={from} />
    } 
    
    return (
        <Card className="InnerCard" fontColor="black">
            Please Login Here!!
            <form class="form-inline" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" placeholder="Enter email"
                    onChange={handleChange} required />
                <input type="password" id="password" name="password" autocomplete="current-password"
                    onChange={handleChange} required />
                <input type="submit" name="Submit" />
            </form>
        </Card>
    );
}

export default SignIn;