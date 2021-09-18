import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserService from './UserService';

const Private = ({component: Component, ...rest}) => {
  console.log('Private UserService.isLoggedIn? ' + UserService.isLoggedIn());
  return (
    <Route {...rest} render={props => (            
      UserService.isLoggedIn() == 'access_token'
        ? <Component {...props} />            
        : <Redirect  to={{pathname: '/signIn', state: {from: props.location}}} />        
    )} />   
  );
}

export default Private;