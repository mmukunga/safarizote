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
      setForm({...form, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
          username: form.email,
          password: form.password
        };

        UserService.loginUser(user).then(response => {
          localStorage.setItem('jwt_token', 'true');         
          setLoggedIn((prevState) => prevState + 1);
        }).catch(err => {
          console.log(err);
        });
        
    };
      
    if (UserService.isLoggedIn() != 'PleaseLogIn') {
      return <Redirect to={from} />
    } 
    
    return (
        <Card className="InnerCard" fontColor="black">
            Please Login Here!!
            <form className="form-container" onSubmit={handleSubmit}>
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