import React from 'react';
import {Redirect } from 'react-router-dom';
import Card from './Card';
import UserService from './UserService';

const SignIn = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [redirectTo, setRedirectTo] = React.useState(true);
    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });

    console.log(props);

    console.log(props.location);
    console.log(props.location.state);
    console.log(props.location.pathname);
    const { from } = props.location.state || { from: { pathname: '/' } }
    const { from2 } = props.location.state;
    console.log(from);
    console.log(from2);

    const handleChange = (event) => {
      const {name, value} = event.target;
      console.log('name: ' + name + ' value: ' + value);
      setForm({...form, [name]: value});
    }

    console.log('SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
    React.useEffect(() => {
      if (UserService.isLoggedIn() != null) {
          setRedirectTo(true);
      }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Mukunga ' + new Date());

        const user = {
          username: 'm@gmail.com',
          password: '12345',
        };

        UserService.loginUser(user).then(res => {
          localStorage.setItem('jwt_token', res);
          setLoggedIn(true);
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
        
    };
      
    if (redirectTo) {
      console.log('Mukunga ' + new Date());
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