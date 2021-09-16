import React from 'react';
import {Redirect, useLocation } from 'react-router-dom';
import Card from './Card';
import UserService from './UserService';

const SignIn = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });

    let location = useLocation();  

    console.log(props.location);
    console.log(props.location.state);
    console.log(props.location.pathname);
    console.log(from);

    //const { from } = location.state || { from: { pathname: "/" } };
    const { from } = props.location.state;
    console.log(location);
    console.log(location.state);
    console.log(from);

    const handleChange = (event) => {
      const {name, value} = event.target;
      console.log('name: ' + name + ' value: ' + value);
      setForm({...form, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
          username: 'm@gmail.com',
          password: '12345',
        };

        UserService.loginUser(user).then(res => {
          console.log("SET_IT!! SET_IT!! SET_IT!! SET_IT!! SET_IT!!");
          console.log(res);
          console.log(res.token);
          localStorage.setItem('access_token', res.token);

          var keys = Object.keys(localStorage),
          i = 0, key;

          for (; key = keys[i]; i++) {
              console.log( key + ' XXX=XXX ' + localStorage.getItem(key));
          }

          console.log('localStorage.setItem:= ' + localStorage.getItem('access_token'));
          console.log('SignIn.isLoggedIn:= ' + UserService.isLoggedIn);
          setLoggedIn(true);
          console.log(res);
          console.log(from);
          //return <Redirect to='/shopping' />;
        }).catch(err => {
          console.log(err);
        });
    };

    
       if (true) {
         console.log('Mukunga');
        <Redirect to={{
          pathname: "/shopping",
          state: {
            from: location,
            user:'Mukunga' // user props
          }
        }} />
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