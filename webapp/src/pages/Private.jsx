import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const Private = ({component: Component, ...rest}) => {
  const login = (props, d) => {
      if (d.username === 'm@gmail.com' && d.password === '12345') {
          localStorage.setItem('userToken', d)
          props.history.push('/home');
      }
  }

  const logout = () => localStorage.removeItem('userToken')
  
  const isLogin = () => {
      if (localStorage.getItem('userToken')) {
        return true;
      }
      return false;
  }

  return (
    <Route {...rest} render={props => (            
      isLogin() 
        ? <Component {...props} />            
        : <Redirect to="/signIn" />        
    )} />   
  );
}

export default Private;