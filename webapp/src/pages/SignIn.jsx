import React from 'react';
import {Redirect, useHistory, useLocation } from 'react-router-dom';
import Card from './Card';
import UserService from './UserService';

const SignIn = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });
    const [error, setError] = React.useState(null);

    let history = useHistory();
    let location = useLocation();  

    const { from } = location.state || { from: { pathname: "/" } };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
          username: 'm@gmail.com',
          password: '12345',
        };

        UserService.loginUser(user).then(res => {
          console.log(res);
          localStorage.setItem('access_token', res.token);
          console.log(res);
        }).catch(err => {
          setError(err.message);
          console.log(err);
        });
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log('name: ' + name + ' value: ' + value);
        setForm({...form, [name]: value});
    }

    if (localStorage.getItem('access_token')!=null) {
        console.log('!!1.IS LOGGED IN!!');
        console.log(from);
        console.log(location.pathname); 
        console.log(location.search); 
        console.log(location.state);
        console.log('!!2.IS LOGGED IN!!');
        return <Redirect to={from} />;
      } else {
        console.log('!!1.IS LOGGED NOT IN!!');
        console.log(from);
        console.log('!!1.IS LOGGED NOT IN!!');  
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