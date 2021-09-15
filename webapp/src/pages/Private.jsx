import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import UserService from './UserService';

const Private = ({component: Component, ...rest}) => {
  const loggedIn =  UserService.isLoggedIn;
  console.log('UserService.isLoggedIn? ' + UserService.isLoggedIn);
  return (
    <Route {...rest} render={props => (            
      loggedIn == 'access_token'
        ? <Component {...props} />            
        : <Redirect  to={{pathname: '/signIn', state: {from: props.location}}} />        
    )} />   
  );
}

export default Private;