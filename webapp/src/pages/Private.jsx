import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const Private = ({component: Component, ...rest}) => {

  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100)
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
  }

  return (
    <Route {...rest} render={props => (            
      fakeAuth.isAuthenticated === true
        ? <Component {...props} />            
        : <Redirect to="/signIn" />        
    )} />   
  );
}

export default Private;