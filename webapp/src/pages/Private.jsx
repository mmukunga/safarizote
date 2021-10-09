import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserService from './UserService';

const Private = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (            
      UserService.isLoggedIn() == 'true'
        ? <Component {...props} />            
        : <Redirect  to={{pathname: '/signIn', state: {from: props.location}}} />        
    )} />   
  );
}

export default Private;