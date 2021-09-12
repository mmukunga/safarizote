import React from 'react';
import axios from 'axios';
import { Redirect, Route, useLocation } from 'react-router-dom';
import UserService from './UserService';

const Private = ({component: Component, ...rest}) => {
  const location = useLocation();
  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      const userToken = localStorage.getItem('access_token');

      if (userToken !== null) {
        console.log('!!IS AUTHENTICATED!!');
      }  

      console.log('1...PrivateRoute.fakeAuth()...');
      console.log(userToken);
      console.log('2...PrivateRoute.fakeAuth()...');
      this.isAuthenticated = true;
      setTimeout(cb, 100);
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  }

  return (
    <Route {...rest} render={props => (            
          UserService.isLoggedIn == true
        ? <Component {...props} />            
        : <Redirect  to={{pathname: '/signIn', state: {from: props.location}}} />        
    )} />   
  );
}

export default Private;