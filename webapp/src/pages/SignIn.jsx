import React from 'react';
import {Redirect } from 'react-router-dom';
import Card from './Card';
import UserService from './UserService';

const SignIn = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [redirectTo, setRedirectTo] = React.useState('false');
    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });

    console.log(props);

    console.log(props.location);
    console.log(props.location.state);
    console.log(props.location.pathname);
    const { from } = props.location.state || { from: { pathname: '/' } }
    //const { from } = props.location.state;
    console.log(from);

    const handleChange = (event) => {
      const {name, value} = event.target;
      console.log('name: ' + name + ' value: ' + value);
      setForm({...form, [name]: value});
    }

    React.useEffect(() => {
      console.log('1 SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
      if (UserService.isLoggedIn() != null) {
        console.log('2 SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
          setRedirectTo(true);
          console.log('3 SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
      }
      console.log('4 SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Mukunga ' + new Date());

        const user = {
          username: form.email,
          password: form.password
        };

        UserService.loginUser(user).then(response => {
          console.log('200** SignIn.isLoggedIn:= ' + response);
          console.log(response);
          //console.log(response.token);
          localStorage.setItem('jwt_token', 'access_token');
          localStorage.setItem('rememberMe', 'Mulevi');
          //console.log(response.token);
          localStorage.setItem('counterRef', counter);
          console.log('201** SignIn.isLoggedIn:= ' + response);
        }).catch(err => {
          console.log(err);
        });
        
    };
      
    if (redirectTo) {
      console.log('Mukunga ' + new Date());
      console.log('100** SignIn.isLoggedIn:= ' + UserService.isLoggedIn());
      console.log('100** SignIn.isLoggedIn  FORM!!:= ' + from);
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